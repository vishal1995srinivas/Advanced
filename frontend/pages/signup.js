import SignUp from '../components/SignUp';
import Signin from '../components/Signin';
import styled from 'styled-components';
import ResetRequest from '../components/RequestReset';
const Columns = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-gap: 20px;
`;
const SignUpPage = (props) => (
	<Columns>
		<SignUp />
		<Signin />
		<ResetRequest />
	</Columns>
);
export default SignUpPage;
