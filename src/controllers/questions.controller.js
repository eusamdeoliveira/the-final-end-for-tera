const db = require("../config/database");
const Joi = require('@hapi/joi')

exports.newQuestion = async (req, res) => {

  //TODO: lidar com SQL injection
  
  if(req.user.role !== 1) { 
    return res.status(403).send()
  }

  const { id, name } = req.body;

  const schema = Joi.object({ 
    id: Joi.number().min(1).required(),
    name: Joi.string().min(3).required()
  })

  try {
    const { error } = await schema.validateAsync({ id, name })
  
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
      `INSERT INTO questions (
        qst_maker,
        qst_course,
        qst_name,
        qst_createdat
      ) SELECT '${req.user.id}', '${id}', '${name}', 'NOW()' 
          WHERE 
            EXISTS (SELECT user_id FROM users WHERE user_id = '${req.user.id}' AND user_role = 1 AND user_isactive IS TRUE);
      `,
    )

    if(response['rowCount'] == 1) 
      return res.status(201).send({ message: "Question created successfully!" });

    return res.status(406).send({ message: "Question not created!" });
  } catch(e) {
    console.error(e)
    return res.status(500).send({
      message: "Error creating the question"
    });
  }
};

exports.newOption = async (req, res) => {

  //TODO: lidar com SQL injection
  
  if(req.user.role !== 1) { 
    return res.status(403).send()
  }

  const { id, name, isCorrect } = req.body;

  const schema = Joi.object({ 
    id: Joi.number().min(1).required(),
    name: Joi.string().min(3).required(),
    isCorrect: Joi.bool().required()
  })

  try {
    const { error } = await schema.validateAsync({ id, name, isCorrect })
  
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
      `INSERT INTO question_options (
        qst_opt_question,
        qst_opt_name,
        qst_opt_is_correct,
        qst_createdat
      ) SELECT '${req.user.id}', '${id}', '${name}', 'NOW()' 
          WHERE 
            EXISTS (SELECT user_id FROM users WHERE user_id = '${req.user.id}' AND user_role = 1 AND user_isactive IS TRUE)
            AND EXISTS (SELECT qst_id FROM question WHERE qst_id = '${id}' AND qst_maker = '${req.user.id}');
      `,
    )

    if(response['rowCount'] == 1) 
      return res.status(201).send({ message: "Option created successfully!" });

    return res.status(406).send({ message: "Option not created!" });
  } catch(e) {
    console.error(e)
    return res.status(500).send({
      message: "Error creating the option."
    });
  }
};

exports.newAnswer = async (req, res) => {

  if(req.user.role !== 2) { 
    return res.status(403).send()
  }

  const { id } = req.body;

  const schema = Joi.object({ 
    id: Joi.number().min(1).required()
  })

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
      `INSERT INTO question_answers (
        qst_ans_question_option,
        qst_ans_maker,
        qst_ans_createdat
      ) SELECT '${id}', '${req.user.id}', 'NOW()' 
          WHERE 
            EXISTS (SELECT user_id FROM users WHERE user_id = '${req.user.id}' AND user_role = 2 AND user_isactive IS TRUE)
            AND NOT EXISTS (SELECT qst_ans_id FROM question_answers WHERE qst_ans_maker = '${req.user.id}' AND qst_ans_question_option = ${id});
      `,
    )

    if(response['rowCount'] == 1) 
      return res.status(201).send({ message: "Answer saved successfully!" });

    return res.status(406).send({ message: "Answer not saved!" });
  } catch(e) {
    console.error(e)
    return res.status(500).send({
      message: "Error saving the answer."
    });
  }
};

exports.coursesByCourseAndStudentid = async (req, res) => {

  if(req.user.role !== 2) { 
    return res.status(403).send()
  }

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
          q.qst_id as question_id,
          qo.qst_opt_id as option_id,
          qa.qst_ans_question_option as chosen_option,
          q.qst_name as question_name,
          qo.qst_opt_name as option_name,
          qo.qst_opt_is_correct as option_is_correct
          
        FROM questions AS q
        INNER JOIN courses AS c ON q.qst_course = c.crs_id AND q.qst_course = ${id}
        LEFT JOIN question_options AS qo ON qo.qst_opt_question = q.qst_id
        LEFT JOIN question_answers AS qa ON qa.qst_ans_question_option = qo.qst_opt_id AND qa.qst_ans_maker = ${req.user.id}
      `,
    );
  
    if(response.rows[0] == undefined) {
      return res.status(200).send([]);
    }

    const questions = {}

    for(row of response.rows) {
      if(!questions[row.question_id]) {
        questions[row.question_id] = {
          question_id: row.question_id,
          question_name: row.question_name,
          options: []
        }
      }

      questions[row.question_id]['options'].push({
        option_id: row.option_id,
        option_name: row.option_name,
        option_is_correct: row.option_is_correct
      })

      if(row.chosen_option) {
        questions[row.question_id]['chosen_option'] = row.chosen_option
        questions[row.question_id]['is_chosen_option_correct'] = row.option_is_correct
      }
    }

    return res.status(200).send(Object.values(questions));
  } catch(e) {
    console.error(e)
    return res.status(500).send({
      message: "Erro getting the course"
    });
  }
};

exports.coursesByCourseAndTeacherid = async (req, res) => {

  if(req.user.role !== 1) { 
    return res.status(403).send()
  }
  
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
          q.qst_id as question_id,
          qo.qst_opt_id as option_id,
          u.user_name as student,
          qa.qst_ans_question_option as chosen_option,
          q.qst_name as question_name,
          qo.qst_opt_name as option_name,
          qo.qst_opt_is_correct as option_is_correct
          
        FROM questions AS q
        INNER JOIN courses AS c ON q.qst_course = c.crs_id AND q.qst_course = ${id}
        LEFT JOIN question_options AS qo ON qo.qst_opt_question = q.qst_id
        LEFT JOIN question_answers AS qa ON qa.qst_ans_question_option = qo.qst_opt_id
        LEFT JOIN users as u ON qa.qst_ans_maker = u.user_id
      `,
    );
  
    if(response.rows[0] == undefined) {
      return res.status(200).send([]);
    }

    const questions = {}

    for(row of response.rows) {
      if(!questions[row.question_id]) {
        questions[row.question_id] = {
          question_id: row.question_id,
          question_name: row.question_name,
          options: [],
          answers: []
        }
      }

      questions[row.question_id]['options'].push({
        option_id: row.option_id,
        option_name: row.option_name,
        option_is_correct: row.option_is_correct
      })

      if(row.chosen_option) {
        questions[row.question_id]['answers'].push({
          student: row.student,
          chosen_option: row.option_name,
        })
      }
    }

    return res.status(200).send(Object.values(questions));
  } catch(e) {
    console.error(e)
    return res.status(500).send({
      message: "Erro getting the course"
    });
  }
};

exports.coursesByCourseAndAdmId = async (req, res) => {

  if(req.user.role !== 0) { 
    return res.status(403).send()
  }
  
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
          q.qst_id as question_id,
          qo.qst_opt_id as option_id,
          q.qst_name as question_name,
          qo.qst_opt_name as option_name,
          qo.qst_opt_is_correct as option_is_correct
          
        FROM questions AS q
        INNER JOIN courses AS c ON q.qst_course = c.crs_id AND q.qst_course = ${id}
        LEFT JOIN question_options AS qo ON qo.qst_opt_question = q.qst_id
      `,
    );
  
    if(response.rows[0] == undefined) {
      return res.status(200).send([]);
    }

    const questions = {}

    for(row of response.rows) {
      if(!questions[row.question_id]) {
        questions[row.question_id] = {
          question_id: row.question_id,
          question_name: row.question_name,
          options: [],
        }
      }

      questions[row.question_id]['options'].push({
        option_id: row.option_id,
        option_name: row.option_name,
        option_is_correct: row.option_is_correct
      })
    }

    return res.status(200).send(Object.values(questions));
  } catch(e) {
    console.error(e)
    return res.status(500).send({
      message: "Erro getting the course"
    });
  }
};

// exports.removeCoursesByUserId = async (req, res) => {

//   if(req.user.role !== 2) { 
//     return res.status(403).send()
//   }

//   const { course_id } = req.params;

//   const schema = Joi.object({ course_id: Joi.number().min(1).required() })

//   try {
//     const { error } = await schema.validateAsync({ course_id })
  
//     if(error) { throw new Error() }
//   } catch(e) {
//     res.status(406).send({
//       message: "Invalid params"
//     });
//   }

//   try {
//     //TODO: Chamar as opcoes, inscrições e respostas quando houver
//     const response = await db.query(`DELETE FROM subscriptions WHERE sbc_crs_id = ${course_id} AND sbc_user_id = ${req.user.id}`);
  
//     if(response['rowCount'] == 0) {
//       return res.status(404).send({
//         message: "No Course Found"
//       });
//     }

//     return res.status(200).send();
//   } catch(e) {
//     return res.status(500).send({
//       message: "Erro deleting the course"
//     });
//   }
// };


