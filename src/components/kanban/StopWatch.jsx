import React, { useState, useRef, useEffect } from 'react'
// import formatTime from 'utils/formatTime'
// import { useSelector, useDispatch } from 'react-redux'
// import { decrement, increment, counterSlice } from 'store/counterSlice'

const StopWatch = ({ theme, setTasks, tasks, item, updateTask, taskData }) => {
	const [seconds, setSeconds] = useState(item.seconds)
	const [minutes, setMinutes] = useState(item.minutes)
	const [hours, setHours] = useState(item.hours)
	const [isPaused, setIsPaused] = useState(false)
	const countRef = useRef(null)
	const localData = useRef({seconds: seconds, minutes:minutes, hours:hours})

	const handleStart = () => {
		setIsPaused(true)
		if(item.status === "In Progress" && isPaused === false){
			countRef.current = setInterval(() => {
				setSeconds((seconds) => seconds += 1)
			}, 1000)
		}
	}

	const handlePause = () => {
		clearInterval(countRef.current)
		setIsPaused(false)
	}

	localData.current = JSON.parse(localStorage.getItem(`task_${item.id}`))

	useEffect(() => {
    	// pause seconds
		if(item && item.status === "Done")	{
			console.log(localData.current, "from stopwatch")
			setTimeout(() => {
				setTasks(tasks.map((element) => {
				    console.log("localData.current localData.current.seconds",localData.current["seconds"])
				    if(element.id === item.id ){
					    return {
						    ...element, minutes: localData.current.minutes, hours: localData.current.hours, seconds: localData.current.seconds
					    }
				    }
				    return element;
			    }))
			}, 1000)
			handlePause()
			console.log("localData.current",localData.current, "item:", item.seconds)
		}
  	}, []);

	useEffect(() => {
    	// update minutes and reset seconds
		if(item && item.id)	{
			const data = {seconds: seconds, minutes:minutes, hours:hours}
			if(seconds >= 0 && isPaused === true){
				localStorage.setItem(`task_${item.id}`, JSON.stringify(data))
			}
		}

		if(seconds > 59)	{
			setSeconds(0)
			setMinutes((minutes) => minutes += 1)
			setTasks(tasks.map((element) => {
				if(element.id === item.id ){
					return {
						...element, minutes: minutes, hours: hours, seconds: 0
					}
				}
				return element;
			}))
		}
		if(minutes > 59)	{
			setMinutes(0)
			setHours((hours) => hours += 1)
			setTasks(tasks.map((element) => {
				if(element.id === item.id ){
					return {
						...element, minutes: 0, hours: hours, seconds: seconds
					}
				}
				return element;
			}))
		}
  	});

	useEffect(() => {
    	// Start the seconds and save seconds to the respective item
		if(item && item.status === "In Progress")	{
			handleStart()
		}
  	}, []);

	return (
		<div className="app">
			<div className='stopwatch-card'>
				{(item.status === "Done" || "To Do") && localData.current
				?
				<p className='text-muted'>
					{localData.current.hours > 0 ? <span className='mr-2'>{localData.current.hours} hours</span> : <span></span>}
					{localData.current.minutes > 0 ? <span className='mr-2'>{localData.current.minutes} min</span> : <span></span>}
					{localData.current.seconds > 0 ? <span>{localData.current.seconds} sec</span> : <span>0 sec</span>}
				</p>
				:
				<p className='text-muted'>
					{hours > 0 ? <span className='mr-2'>{hours} hours</span> : <span></span>}
					{minutes > 0 ? <span className='mr-2'>{minutes} min</span> : <span></span>}
					{seconds > 0 ? <span>{seconds} sec</span> : <span>0 sec</span>}
				</p>}
			</div>
		</div>
	);
}

export default StopWatch;