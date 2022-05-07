import React, { useState, useRef } from 'react'
import { useEffect } from 'react'

const StopWatch = ({ theme, setTasks, tasks, item }) => {
	const [timer, setTimer] = useState(0)
	const [isActive, setIsActive] = useState(false)
	const [isPaused, setIsPaused] = useState(false)
	const countRef = useRef(null)

	const handleStart = () => {
		setIsActive(true)
		setIsPaused(true)
		countRef.current = setInterval(() => {
			setTimer((timer) => timer + 1)
		}, 1000)
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

	const formatTime = (timer) => {
		const getSeconds = `0${(timer % 60)}`.slice(-2)
		const minutes = `${Math.floor(timer / 60)}`
		const getMinutes = `0${minutes % 60}`.slice(-2)
		const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

		return `${getHours} : ${getMinutes} : ${getSeconds}`
	}

	useEffect(() => {
    	// Update the state with this data
		console.log(timer, item)
		if(item && item.id)	{
			console.log("ID is:",item.id )
			item.time = timer
		}
  	});

	return (
		<div className="app">
			<div className='stopwatch-card'>
				{/* {!item.id !== undefined ? <p id='timedate'>{formatTime()} {item.id}</p> : <p id='timedate'>{formatTime()}</p>} */}
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