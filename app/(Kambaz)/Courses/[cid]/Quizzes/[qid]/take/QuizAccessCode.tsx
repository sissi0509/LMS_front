"use client"
import React, { useState } from 'react'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';

export default function QuizAccessCode({quiz, setPromt, updateAttempt}: 
  {quiz: any; setPromt: (show: boolean) => void; updateAttempt: () => void;}) {

    const [userEnteredCode, setUserEnteredCode] = useState("")
    const [correct, setCorrect] = useState(true)



    if (!quiz) {
        return <div>loading...</div>
    }
  return (
    <div>
        {!correct && <Alert variant="danger">Please enter correct access code.</Alert>}

        This quiz requires an access code. Please enter the access code to start the quiz. 
        <br/><br/>
        <div>
        <Row>
          <Form.Label column className="text-end" sm="2">Access Code: </Form.Label>
          <Col sm="5">
            <Form.Control placeholder="Please enter the passcode" onChange={(e) => 
                setUserEnteredCode(e.target.value)}
                />
          </Col>
          <Col>
              <Button onClick={(e) => {
                if (userEnteredCode === quiz.accessCode) {
                  setCorrect(correct)
                  setPromt(false)
                  updateAttempt()
                } else {
                  setCorrect(false)
                }
                  }
              }>Submit</Button>
          </Col>
          </Row>
        </div>
    </div>
  )
}
