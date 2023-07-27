import { Link } from "react-router-dom";

function Home() {
    const accessTokenCoVan = sessionStorage.getItem('accessTokenCoVan')
    const styles = {
        fontSize:'1.6rem',
        textDecoration: 'none', // Remove underline from links
        color: '#fff', // Set text color to white
        padding: '12px 20px', // Add padding to the links
        borderRadius: '8px', // Add rounded corners
        backgroundColor: '#007bff', // Set background color to a blue shade
        display: 'block', // Set links to display as block elements
        width: '200px', // Set the width of the links
        margin: '10px auto', // Center the links horizontally in the grid
        textAlign: 'center', // Center the text inside the links
    }
    return (
        <div className="grid">
            <h1>Bạn là sinh viên hay cố vấn học tập</h1>
            <Link style={styles} to='/profile'>Tôi là sinh viên</Link>
            <br/>
            <Link style={styles} to={accessTokenCoVan?'/covan/profile':'/covan/login'}>Tôi là cố vấn</Link>
        </div>
    )
}

export default Home;