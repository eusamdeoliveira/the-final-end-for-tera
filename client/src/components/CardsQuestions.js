import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { AuthContext } from '../helper/auth';
import { fetcher } from '../helper/fetcher';
import { URL_BASE } from '../helper/constants';
import { useNavigate } from 'react-router';
import Button from 'react-bootstrap/Button';

export const CardsQuestions = ({ courseId }) => {

  const auth = React.useContext(AuthContext)

  let navigate = useNavigate();

  const [data, setData] = useState([])

  let isLoading = false

  const apiUrlMapper = {
    0: 'adm',
    1: 'teacher',
    2: 'student'
  }

  let answers = {}

  const saveAnswer = async (id) => {
    if(!answers[id]) return
    try {
      await fetcher(URL_BASE + '/api/questions/answer/new', 'POST', {'Content-Type': 'application/json', 'auth-token': auth.getUser().token}, JSON.stringify({id: answers[id]}))
      navigate(0)
    } catch(e) {
      console.error(e)
    }
    
  }

  useEffect(() => {
    async function fetchMyAPI() {
      let responses = await fetcher(URL_BASE + `/api/questions/${apiUrlMapper[auth.getUser().role]}/${courseId}`, 'GET', {'auth-token': auth.getUser().token})
      const items = []

      for (let response of responses) {
        items.push(
          <Card style={{ width: '85vw', marginTop: '20px'}} >
            <Card.Body style={{backgroundColor: response.chosen_option ? response.is_chosen_option_correct ? 'rgb(25, 135, 84, 0.4)' : 'rgb(220, 53, 69, 0.4)' : '#FFF'}}>
                <Card.Title dangerouslySetInnerHTML={{__html: response.question_name}}></Card.Title>
                <Form>
                  {
                    response.options.map((option, index) => (
                      <div className="mb-3">
                        {
                          auth.getUser().role === 2 && response.chosen_option !== undefined &&
                          (
                            <Form.Check>
                              <Form.Check.Input disabled type="radio" checked={response.chosen_option === option.option_id} />
                              <Form.Check.Label style={{ fontWeight: option.option_is_correct ? 'bold' : undefined }}>{`${index + 1}) ${option.option_name}`}</Form.Check.Label>
                            </Form.Check>
                          )
                        }
                        {
                          auth.getUser().role === 2 && response.chosen_option === undefined && 
                          (
                            <Form.Check 
                              type="radio"
                              label={`${index + 1}) ${option.option_name}`}
                              name={response.question_id}
                              onChange={() => answers[response.question_id] = option.option_id}
                            />
                          )
                        }
                        {
                          auth.getUser().role < 2 && 
                          (
                            <Form.Check>
                              <Form.Check.Label style={{ fontWeight: option.option_is_correct ? 'bold' : undefined }}>{`${index + 1}) ${option.option_name}`}</Form.Check.Label>
                            </Form.Check>
                          )
                        }
                      </div>
                      )
                    )
                  }
                </Form>
            </Card.Body>
            {
              auth.getUser().role === 2 && 
              response.chosen_option === undefined && 
              (
                <Card.Footer>
                  <Button variant="primary" onClick={() => saveAnswer(response.question_id)}>Salvar</Button>
                </Card.Footer>
              )
            }
            {
              auth.getUser().role === 1 && 
              response.chosen_option === undefined && 
              (
                <Card.Footer>
                  {response.answers[0] !== undefined && response.answers.map((answer) => (<Card.Text>{answer.student}: {answer.chosen_option}</Card.Text>))}
                  {response.answers[0] === undefined && (<Card.Text>Questão ainda não respondida!</Card.Text>)}
                </Card.Footer>
              )
            }
          </Card>
        )
      }
      setData(items)
    }
    isLoading = true
    fetchMyAPI()
  }, data)

  if(data[0] === undefined) {
    let body = (<h1>Nada a mostrar</h1>)
    if(isLoading) {
      isLoading = false;
      body = (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      )
    }

    return (<div style={{height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{body}</div>); 
  }
  
  return (
    <>
      {/* <h1 style={{margin: '20px 7vw'}}>Todos os cursos</h1> */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {data}
        <br />
      </div>
    </>
  )
}

