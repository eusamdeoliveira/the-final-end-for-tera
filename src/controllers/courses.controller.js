const db = require("../config/database");
const Joi = require('@hapi/joi')

exports.newCourse = async (req, res) => {

  if(req.user.role !== 0) { 
    return res.status(403).send()
  }

  const { 
    name,
    description,
  } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
  })

  try {
    const { error } = await schema.validateAsync({username})
  
    if(error) {
      throw new Error()
    }
  } catch(e) {
    res.status(406).send({
      message: "Invalid params"
    });
  }

  try {
    const response = await db.query(
      `INSERT INTO courses (
        crs_name,
        crs_maker,
        crs_description,
        crs_createdat
      ) SELECT '${name}', '${req.user.id}', '${description}', 'NOW()' 
          WHERE EXISTS (SELECT user_id FROM users WHERE user_id = '${req.user.id}' AND user_role = 0 AND user_isactive IS TRUE);
      `,
    )

    if(response['rowCount'] == 1) {
      res.status(201).send({ message: "Course created successfully!" });
    } else {
      res.status(406).send({ message: "Course not created!" });
    }
  } catch(e) {
    console.error(e)
    res.status(500).send({
      message: "Error creating the course"
    });
  }
  
};

exports.allCourses = async (req, res) => {

  const { filter } = req.query
  
  try {
    const query = `
    SELECT 
      c.crs_id AS id, 
      c.crs_name AS name,
      c.crs_description AS description,
      u.user_name AS maker,
      s.sbc_id IS NOT NULL as issubscribed
    FROM courses AS c 
    INNER JOIN users AS u ON c.crs_maker = u.user_id
    LEFT JOIN subscriptions AS s ON c.crs_id = s.sbc_crs_id AND s.sbc_user_id = ${req.user.id}
    ${filter !== undefined ? `WHERE c.crs_name LIKE '%${filter}%';` : ''}
  `;
    const response = await db.query(query);
  
    if(response.rows[0] == undefined) {
      return res.status(200).send([]);
    }
  
    res.status(200).send(response.rows);
  } catch(e) {
    res.status(500).send("Erro");
  }
};

exports.courseById = async (req, res) => {
  const { id } = req.params;

  const schema = Joi.object({ id: Joi.number().min(1).required() })

  try {
    const { error } = await schema.validateAsync({id})
  
    if(error) {
      throw new Error()
    }
  } catch(e) {
    res.status(406).send({
      message: "Invalid params"
    });
  }

  try {
    const response = await db.query(
      `SELECT 
        c.crs_id AS id, 
        c.crs_name AS name,
        c.crs_description AS description,
        u.user_name AS maker 
      FROM courses AS c 
      INNER JOIN users AS u ON c.crs_maker = u.user_id
      WHERE crs_id = ${id}
      `,
    );
  
    if(response.rows[0] == undefined) {
      return res.status(404).send({
        message: "No Course Found"
      });
    }

    return res.status(200).send(response.rows);
  } catch(e) {
    return res.status(500).send({
      message: "Erro getting the course"
    });
  }
};

exports.removeCourseById = async (req, res) => {

  if(req.user.role !== 0) { 
    return res.status(403).send()
  }

  const { id } = req.params;

  const schema = Joi.object({ id: Joi.number().min(1).required() })

  try {
    const { error } = await schema.validateAsync({id})
  
    if(error) { throw new Error() }
  } catch(e) {
    res.status(406).send({
      message: "Invalid params"
    });
  }

  try {
    //TODO: Chamar as opcoes, inscrições e respostas quando houver
    const response = await db.query(`DELETE FROM courses WHERE crs_id = ${id}`);
  
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

