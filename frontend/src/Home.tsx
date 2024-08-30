import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import styles from './Home.module.css';
import home1 from './assets/home1.jpg';
import home2 from './assets/home2.jpg';
import home3 from './assets/home3.jpg';

export function Home() {
    return (
        <div className={styles.home}>
            <Card style={{ width: '100%' }} aria-label="Card mostrando informação sobre sistema">
                <Card.Img variant="top" src={home1} alt="Imagem de um salão de beleza" />
                <Card.Body>
                    <Card.Title as="h2">Gerenciando meu salão</Card.Title>
                    <Card.Text>
                        Sistema de gerenciamento para seu dia a dia.
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}
