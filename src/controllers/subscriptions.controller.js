const db = require("../config/database");
const Joi = require('@hapi/joi')

exports.newSubscription = async (req, res) => {
  
  if(req.user.role !== 2) { 
    return res.status(403).send()
  }

  const { id } = req.body;

  const schema = Joi.object({ id: Joi.number().min(1).required() })

  try {
    const { error } = await schema.validateAsync({ id })
  
    if(error) {
      throw new Error()
    }
  } catch(e) {
    return res.status(406).send({
      message: "Invalid params"
    });
  }

  try {
    const response = await db.query(
      `INSERT INTO subscriptions (
        sbc_crs_id,
        sbc_user_id,
        sbc_createdat
      ) SELECT '${id}', '${req.user.id}', 'NOW()' 
          WHERE 
            EXISTS (SELECT user_id FROM users WHERE user_id = '${req.user.id}' AND user_role = 2 AND user_isactive IS TRUE)
            AND NOT EXISTS (SELECT sbc_id FROM subscriptions WHERE sbc_crs_id = '${id}' AND sbc_user_id = '${req.user.id}');
      `,
    )
  
    if(response['rowCount'] == 1) 
      return res.status(201).send({ message: "User subscribed successfully!" });
  
    return res.status(406).send({ message: "User not subscribed!" });
  } catch(e) {
    console.error(e)
    return res.status(500).send({
      message: "Error subscribing the user"
    });
  }
  
};

exports.coursesByUserid = async (req, res) => {

  if(req.user.role !== 2) { 
    return res.status(403).send()
  }

  try {
    const response = await db.query(
      `SELECT 
        c.crs_id AS id, 
        c.crs_name AS name,
        c.crs_description AS description,
        u.user_name AS maker 
      FROM subscriptions AS s 
      INNER JOIN courses AS c ON s.sbc_crs_id = c.crs_id 
      INNER JOIN users AS u ON c.crs_maker = u.user_id
      WHERE sbc_user_id = ${req.user.id}
      `,
    );
  
    if(response.rows[0] == undefined) {
      return res.status(200).send([]);
    }

    return res.status(200).send(response.rows);
  } catch(e) {
    return res.status(500).send({
      message: "Erro getting the course"
    });
  }
};

exports.removeCoursesByUserId = async (req, res) => {

  if(req.user.role !== 2) { 
    return res.status(403).send()
  }

  const { course_id } = req.params;

  const schema = Joi.object({ course_id: Joi.number().min(1).required() })

  try {
    const { error } = await schema.validateAsync({ course_id })
  
    if(error) { throw new Error() }
  } catch(e) {
    res.status(406).send({
      message: "Invalid params"
    });
  }

  try {
    //TODO: Chamar as opcoes, inscrições e respostas quando houver
    const response = await db.query(`DELETE FROM subscriptions WHERE sbc_crs_id = ${course_id} AND sbc_user_id = ${req.user.id}`);
  
    if(response['rowCount'] == 0) {
      return res.status(404).send({
        message: "No Course Found"
      });
    }

    return res.status(200).send();
  } catch(e) {
    return res.status(500).send({
      message: "Erro deleting the course"
    });
  }
};

