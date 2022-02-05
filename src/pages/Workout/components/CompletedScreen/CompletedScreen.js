import { useState } from 'react'
import { StyledCompletedScreen } from './styles';

const CompletedScreen = () => {
	const [open, setOpen] = useState(false);

	return (
		<StyledCompletedScreen open={open}>
			<header onClick={() => setOpen(!open)}>
				Completed (count)
				<div>Expand</div>
			</header>
			<div className='body'>
				Finish some exercises!
			</div>
		</StyledCompletedScreen>
	)
}

export default CompletedScreen