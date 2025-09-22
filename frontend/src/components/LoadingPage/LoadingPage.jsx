import './LoadingPage.css'
import { useAppTheme } from '../../context/Theme/ThemeContext';

const LoadingPage = () => {
    const { theme } = useAppTheme();
    const appImage = {
        light: 'https://profile-images-pencrafted-capstone.s3.us-west-2.amazonaws.com/pen-icon-on-black-background-flat-style-vector-26849186-invert.png',
        dark: 'https://profile-images-pencrafted-capstone.s3.us-west-2.amazonaws.com/pen-icon-on-black-background-flat-style-vector-26849186.png',
    }

    return (
        <div className="loader">
            <img src={theme === 'dark' ? appImage.dark : appImage.light} alt="Pen Icon" className="pen-icon" />
        </div>
    )
}

export default LoadingPage
