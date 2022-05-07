import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import formatTime from 'utils/formatTime'

const StopWatch = ({ theme, setTasks, tasks, item }) => {
	const [timer, setTimer] = useState(item.time)
	const [isActive, setIsActive] = useState(false)
	const [isPaused, setIsPaused] = useState(false)
	const countRef = useRef(null)

	const handleStart = () => {
		setIsActive(true)
		setIsPaused(true)
		if(item.status === "In Progress"){
			countRef.current = setInterval(() => {
				setTimer((timer) => timer + 1)
			}, 1000)
		}
	}

	const handlePause = () => {
		clearInterval(countRef.current)
		setIsPaused(false)
	}

	const handleResume = () => {
		setIsPaused(true)
		countRef.current = setInterval(() => {
			setTimer((timer) => timer + 1)
		}, 1000)
	}

	const handleReset = () => {
		clearInterval(countRef.current)
		setIsActive(false)
		setIsPaused(false)
		setTimer(0)
	}

	

	useEffect(() => {
    	// Update the state with this data
		console.log(timer)
		if(item && item.id)	{
			if(timer >= 1 ){
				console.log("ID is:",item.id, "time:", timer )
				item.time = timer
			}
		}
  	});
	
	useEffect(() => {
    	// pause timer
		if(item && item.status === "Done")	{
			console.log("status is Done:", item.time, "time:", timer )
			handlePause()
		}
  	}, []);

	useEffect(() => {
    	// Start the timer and save timer to the respective item
		if(item && item.status === "In Progress")	{
			console.log("status is In Progress:", item.time )
			handleStart()
		}
		if(timer >= 60)	{
			item.time = timer
			handleStart()
		}
  	}, []);

	return (
		<div className="app">
			<div className='stopwatch-card'>
				<p id='timedate'>{formatTime(timer)}</p>
				<div className='buttons'>
					{
						!isActive && !isPaused ?
						<button onClick={handleStart}>Start</button>
						: (
							isPaused ? <button onClick={handlePause}>Pause</button> :
							<button onClick={handleResume}>Resume</button>
						)
					}
					<button onClick={handleReset} disabled={!isActive}>Reset</button>
				</div>
			</div>
		</div>
	);
}

export default StopWatch;