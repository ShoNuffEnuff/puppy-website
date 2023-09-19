import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ImageCard() {
    return (
        <Card style={{ width: '18rem' }}>
            
            <Card.Body>
                <Card.Title>Beelzebub Jenkins</Card.Title>
                <Card.Text>
                    Our top soul taker in the nether realms.
                </Card.Text>
                <Button variant="primary">Donate your soul to him</Button>
            </Card.Body>
        </Card>
    );
}

export default ImageCard;