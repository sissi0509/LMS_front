import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useEffect, useState } from "react";
import * as clientE from "../../../client";



export default function StudentQuizAttemptHistory({quizId}: {quizId: string}) {
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const [attempt, setAttempt] = useState<any>({});
    const [startArray, setStartArray] = useState<any>([])
    const [endArray, setEndArray] = useState<any>([])
    const [points, setPoints] = useState<any>([])
    const [totalP, setTotlaP] = useState(0)

    const fetchAttempt = async () => {
        const userId = currentUser?._id ? currentUser._id : "";
        const userAttempt = await clientE.getUserQuizAttempt(quizId, userId);
        setAttempt(userAttempt);
        setStartArray(userAttempt.attempt?.startAt.reverse())
        setEndArray(userAttempt.attempt?.submittedAt.reverse())
        setPoints(userAttempt.attempt?.score.reverse())
      };

    const getQuizTotal = async () => {
        const total = await clientE.findQuizPoints(quizId as string);
        setTotlaP(total);
      };

    const convertToMin = (date: Date) => {
        const hour = date.getHours()
        const min = date.getMinutes()

        return hour * 60 + min
    }

    useEffect(() => {
        fetchAttempt()
        getQuizTotal()
  }, []);

  console.log("totalP", totalP)

  console.log("attempt", attempt)
  console.log("start", attempt.attempt?.startAt)
  console.log("reverse", startArray)
  return (
    <div>
        {attempt.attempt !== null ? 
        <div>
            <h4>Attempt History</h4>
            <div>
            <Table className="border-secondary">
                <thead>
                    <tr><th></th><th>Attempt</th><th>Time</th><th>Score</th></tr>
                </thead>
                {
                    startArray?.map((each: any, index: number) => 
                        {
                        const len = startArray?.length;
                        const submitT = convertToMin(new Date(endArray[index]))
                        const startT = convertToMin(new Date(startArray[index]))
                        const diff = submitT - startT
                        return (
                        <tbody key={index}>
                            <tr><td>{index === 0 ? "Latest" : ""}</td><td>{`Attempt ${len - index}`}</td><td>{diff} minutes</td><td>{points[index]} / {totalP}</td></tr>
                        </tbody>
                        )
                        }
                        
                    
                )}
            </Table>
            </div>
        </div>
            :
        ""
        }   

    </div>
  )
}
