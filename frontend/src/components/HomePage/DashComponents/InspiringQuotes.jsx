import { BiSolidQuoteAltLeft } from "react-icons/bi";
import './DashComponents.css';
import { useEffect, useState } from "react";
import LoadingPage from "../../LoadingPage/LoadingPage";


const writingQuotes = [
    {
        quote: "There is no greater agony than bearing an untold story inside you.",
        author: "Maya Angelou",
    },
    {
        quote: "You can make anything by writing.",
        author: "C.S. Lewis",
    },
    {
        quote: "A word after a word after a word is power.",
        author: "Margaret Atwood",
    },
    {
        quote: "The first draft is just you telling yourself the story.",
        author: "Terry Pratchett",
    },
    {
        quote: "Start writing, no matter what. The water does not flow until the faucet is turned on.",
        author: "Louis L'Amour",
    },
    {
        quote: "Easy reading is damn hard writing.",
        author: "Nathaniel Hawthorne",
    },
    {
        quote: "Writing is its own reward.",
        author: "Henry Miller",
    },
    {
        quote: "Fill your paper with the breathings of your heart.",
        author: "William Wordsworth",
    },
    {
        quote: "Write what should not be forgotten.",
        author: "Isabel Allende",
    },
    {
        quote: "The scariest moment is always just before you start.",
        author: "Stephen King",
    },
    {
        quote: "If there's a book that you want to read, but it hasn't been written yet, then you must write it.",
        author: "Toni Morrison",
    },
    {
        quote: "To survive, you must tell stories.",
        author: "Umberto Eco",
    },
    {
        quote: "Writing is thinking on paper.",
        author: "William Zinsser",
    },
    {
        quote: "The role of a writer is not to say what we all can say, but what we are unable to say.",
        author: "Anaïs Nin",
    },
    {
        quote: "No tears in the writer, no tears in the reader.",
        author: "Robert Frost",
    },
    {
        quote: "The purpose of a writer is to keep civilization from destroying itself.",
        author: "Albert Camus",
    },
    {
        quote: "Writing is the painting of the voice.",
        author: "Voltaire",
    },
    {
        quote: "You don't write because you want to say something, you write because you have something to say.",
        author: "F. Scott Fitzgerald",
    },
    {
        quote: "Words are our most inexhaustible source of magic.",
        author: "J.K. Rowling",
    },
    {
        quote: "A writer is someone for whom writing is more difficult than it is for other people.",
        author: "Thomas Mann",
    },
    {
        quote: "The act of writing is the act of discovering what you believe.",
        author: "David Hare",
    },
    {
        quote: "Writing is an exploration. You start from nothing and learn as you go.",
        author: "E.L. Doctorow",
    },
    {
        quote: "Don't tell me the moon is shining; show me the glint of light on broken glass.",
        author: "Anton Chekhov",
    },
    {
        quote: "We write to taste life twice, in the moment and in retrospect.",
        author: "Anaïs Nin",
    },
    {
        quote: "Writing is a socially acceptable form of schizophrenia.",
        author: "E.L. Doctorow",
    },
    {
        quote: "The best time for planning a book is while you're doing the dishes.",
        author: "Agatha Christie",
    },
    {
        quote: "There are three rules for writing a novel. Unfortunately, no one knows what they are.",
        author: "W. Somerset Maugham",
    },
    {
        quote: "Writing comes more easily if you have something to say.",
        author: "Sholem Asch",
    },
    {
        quote: "You fail only if you stop writing.",
        author: "Ray Bradbury",
    },
    {
        quote: "Description begins in the writer's imagination, but should finish in the reader's.",
        author: "Stephen King",
    },
];

const InspiringQuotes = () => {
    const [quote, setQuote] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const randomQuote = writingQuotes[Math.floor(Math.random() * writingQuotes.length)];
        setQuote(randomQuote);
        setLoading(false);
    }, []);



    if (loading) {
        return (
            <div className='dash-comp-container'>
                <div className='pannel-formatting'>
                    Loading...
                </div>
            </div>
        )
    }


    return (
        <div className='dash-comp-container quotes-comp'>
            <div className="pannel-formatting quotes-formatting" >
                <div className='pannel-item quotes-item' >
                    <div className='pannel-item-icon quotes-icon'>
                        <BiSolidQuoteAltLeft />
                    </div>
                    <div className='pannel-item-data-container quotes-data-container'>
                        <div className="pannel-item-description quotes-description">
                            {quote.quote}
                        </div>
                        <div className="pannel-item-description quotes-description">
                            {`-- ${quote.author}`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default InspiringQuotes;