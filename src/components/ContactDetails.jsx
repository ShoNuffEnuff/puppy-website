import Table from 'react-bootstrap/Table';
import './ContactDetails.css';

function ContactData() {
    return (
        <div className='tableStyling'>
        <Table striped bordered hover>
            <tbody>
                <tr>
                    <td><b>Street Address:</b></td>
                </tr>
                <tr>
                    <td>Lvl 4/45 Grenfell St Adelaide SA 5000</td>
                </tr>
                <tr>
                    <td><b>Contact Number:</b></td>
                </tr>
                <tr>
                    <td>1234567890</td>
                </tr>
                <tr>
                    <td><b>Email Address:</b></td>
                </tr>
                <tr>
                    <td>admin@petplus.com.au</td>
                </tr>
            </tbody>
        </Table>
        </div>
    )
}
export default ContactData;