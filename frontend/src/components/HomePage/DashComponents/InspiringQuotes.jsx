import { BiSolidQuoteAltLeft } from "react-icons/bi";
import './DashComponents.css';
import { useEffect, useState } from "react";



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
    quote: "Writing is thinking on paper.",
    author: "William Zinsser",
  },
  {
    quote: "No tears in the writer, no tears in the reader.",
    author: "Robert Frost",
  },
  {
    quote: "Writing is the painting of the voice.",
    author: "Voltaire",
  },
  {
    quote: "Words are our most inexhaustible source of magic.",
    author: "J.K. Rowling",
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
    quote: "We write to taste life twice, in the moment and in retrospect.",
    author: "Anaïs Nin",
  },
  {
    quote: "You fail only if you stop writing.",
    author: "Ray Bradbury",
  },
  {
    quote: "Description begins in the writer's imagination, but should finish in the reader's.",
    author: "Stephen King",
  },
  {
    quote: "A writer is someone for whom writing is more difficult than it is for other people.",
    author: "Thomas Mann",
  },
  {
    quote: "Write hard and clear about what hurts.",
    author: "Ernest Hemingway",
  },
  {
    quote: "The purpose of literature is to turn blood into ink.",
    author: "T.S. Eliot",
  },
  {
    quote: "There is nothing to writing. All you do is sit down at a typewriter and bleed.",
    author: "Ernest Hemingway",
  },
  {
    quote: "A professional writer is an amateur who didn’t quit.",
    author: "Richard Bach",
  },
  {
    quote: "The road to hell is paved with adverbs.",
    author: "Stephen King",
  },
  {
    quote: "Write drunk, edit sober.",
    author: "Ernest Hemingway",
  },
  {
    quote: "The best stories are not written, they are rewritten.",
    author: "Phyllis Whitney",
  },
  {
    quote: "The writer’s job is to tell the truth.",
    author: "Andy Rooney",
  },
  {
    quote: "There are no laws for the novel. There never have been, nor can there ever be.",
    author: "Doris Lessing",
  },
  {
    quote: "You can always edit a bad page. You can’t edit a blank page.",
    author: "Jodi Picoult",
  },
  {
    quote: "Don’t bend; don’t water it down; don’t try to make it logical; don’t edit your own soul according to the fashion.",
    author: "Franz Kafka",
  },
  {
    quote: "A blank piece of paper is God’s way of telling us how hard it is to be God.",
    author: "Sidney Sheldon",
  },
  {
    quote: "The role of a writer is not to say what we all can say, but what we are unable to say.",
    author: "Anaïs Nin",
  },
  {
    quote: "The difference between the almost right word and the right word is really a large matter.",
    author: "Mark Twain",
  },
  {
    quote: "A good writer possesses not only his own spirit but also the spirit of his friends.",
    author: "Friedrich Nietzsche",
  },
  {
    quote: "To gain your own voice, you have to forget about having it heard.",
    author: "Allen Ginsberg",
  },
  {
    quote: "Writing is a socially acceptable form of schizophrenia.",
    author: "E.L. Doctorow",
  },
  {
    quote: "The best time for planning a book is while you’re doing the dishes.",
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
    quote: "The pages are still blank, but there is a miraculous feeling of the words being there, written in invisible ink.",
    author: "Vladimir Nabokov",
  },
  {
    quote: "The only way to learn to write is to write.",
    author: "Peggy Teeters",
  },
  {
    quote: "Your intuition knows what to write, so get out of the way.",
    author: "Ray Bradbury",
  },
  {
    quote: "You must stay drunk on writing so reality cannot destroy you.",
    author: "Ray Bradbury",
  },
  {
    quote: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    quote: "Creativity is allowing yourself to make mistakes. Art is knowing which ones to keep.",
    author: "Scott Adams",
  },
  {
    quote: "Write the kind of story you would like to read.",
    author: "Austin Kleon",
  },
  {
    quote: "Stories may well be lies, but they are good lies that say true things.",
    author: "Neil Gaiman",
  },
  {
    quote: "A story is a letter that the author writes to himself, to tell himself things that he would be unable to discover otherwise.",
    author: "Carlos Ruiz Zafón",
  },
  {
    quote: "Don’t get it right, get it written.",
    author: "James Thurber",
  },
];

const InspiringQuotes = () => {
    const [quote, setQuote] = useState({});
    

    useEffect(() => {
        const randomQuote = writingQuotes[Math.floor(Math.random() * writingQuotes.length)];
        setQuote(randomQuote);
    }, []);



    return (
        <div className='content-panel quotes-comp'>
            <div className="pannel-formatting" >
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