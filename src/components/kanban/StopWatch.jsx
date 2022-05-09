import React, { useState, useRef, useEffect, useMemo } from 'react'
import formatTime from 'utils/formatTime'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, counterSlice } from 'store/counterSlice'

const StopWatch = ({ theme, setTasks, tasks, item }) => {
	const [seconds, setSeconds] = useState(item.seconds)
	const [minutes, setMinutes] = useState(item.minutes)
	const [hours, setHours] = useState(item.hours)
	const [isPaused, setIsPaused] = useState(false)
	const countRef = useRef(null)

	const handleStart = () => {
		setIsPaused(true)
		if(item.status === "In Progress" && isPaused === false){
			countRef.current = setInterval(() => {
				setSeconds((seconds) => seconds = seconds + 1)
			}, 1000)
		}
	}

	const handlePause = () => {
		clearInterval(countRef.current)
		setIsPaused(false)
	}

	// const handleResume = () => {
	// 	setIsPaused(true)
	// 	countRef.current = setInterval(() => {
	// 		setSeconds((seconds) => seconds + 1)
	// 	}, 1000)
	// }

	// const handleReset = () => {
	// 	clearInterval(countRef.current)
	// 	setIsActive(false)
	// 	setIsPaused(false)
	// 	setSeconds(0)
	// }

	// useEffect(() => {
    // 	// update minutes and reset seconds
	// 	if(item && item.id)	{
	// 		if(seconds >= 1 ){
	// 			setTasks(tasks.map((element) => {
	// 				if(element.id === item.id ){
	// 					return {
	// 						...element, minutes: minutes, hours: hours
	// 					}
	// 				}
	// 				return element;
	// 			}))
	// 		}
	// 	}

	// 	if(seconds > 59)	{
	// 		setSeconds(0)
	// 		setMinutes((minutes) => minutes += 1)
	// 	}
	// 	if(minutes > 59)	{
	// 		setMinutes(0)
	// 		setHours((hours) => hours += 1)
	// 	}
  	// });

	useEffect(() => {
    	// pause seconds
		if(item && item.status === "Done")	{
			handlePause()
		}
  	}, []);

	useEffect(() => {
    	// Start the seconds and save seconds to the respective item
		if(item && item.status === "In Progress")	{
			handleStart()
		}
  	}, []);

	return (
		<div className="app">
			<div className='stopwatch-card'>
				<p className='text-muted'>
					{hours > 0 ? <span className='mr-2'>{hours} hours</span> : <span></span>}
					{minutes > 0 ? <span className='mr-2'>{minutes} min</span> : <span></span>}
					{seconds > 0 ? <span>{seconds} sec</span> : <span>0 sec</span>}
				</p>
			</div>
		</div>
	);
}

export default StopWatch;