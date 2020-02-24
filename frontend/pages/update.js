import Link from 'next/link';
import UpdateItem from '../components/CreateItem';
const update = (props) => {
	//Destructure props and == ({query}) with query.id inside
	return (
		<div>
			<UpdateItem id={props.query.id} />
		</div>
	);
};

export default update;
