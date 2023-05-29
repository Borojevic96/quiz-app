import { Question, Quiz } from "@types";

const questionsMockedData: Question[] = [
  {
    id: 1,
    question: "Who directed the movie 'Pulp Fiction'?",
    answer: "Quentin Tarantino",
  },
  {
    id: 2,
    question:
      "In which year was the movie 'The Shawshank Redemption' released?",
    answer: "1994",
  },
  {
    id: 3,
    question:
      "Which actor played the role of Tony Stark in the Marvel Cinematic Universe?",
    answer: "Robert Downey Jr.",
  },
  {
    id: 4,
    question: "Who directed the 'Lord of the Rings' trilogy?",
    answer: "Peter Jackson",
  },
  {
    id: 5,
    question:
      "Which actress won an Academy Award for her role in 'La La Land'?",
    answer: "Emma Stone",
  },
  {
    id: 6,
    question: "Which movie won the Academy Award for Best Picture in 2020?",
    answer: "Parasite",
  },
  {
    id: 7,
    question: "Who directed the movie 'Inception'?",
    answer: "Christopher Nolan",
  },
  {
    id: 8,
    question:
      "Which actress won an Academy Award for her role in 'Black Swan'?",
    answer: "Natalie Portman",
  },
  {
    id: 9,
    question: "In which year was the movie 'Forrest Gump' released?",
    answer: "1994",
  },
  {
    id: 10,
    question:
      "Who played the character of Jack Sparrow in the 'Pirates of the Caribbean' series?",
    answer: "Johnny Depp",
  },
  {
    id: 11,
    question: "Which movie won the Best Picture Oscar in 2020?",
    answer: "Parasite",
  },
  {
    id: 12,
    question: "Who directed the movie 'The Dark Knight'?",
    answer: "Christopher Nolan",
  },
  {
    id: 13,
    question:
      "Which actor played the role of James Bond in the movie 'Casino Royale'?",
    answer: "Daniel Craig",
  },
  {
    id: 14,
    question: "In which year was the first 'Star Wars' movie released?",
    answer: "1977",
  },
  {
    id: 15,
    question: "Who won the Best Actor Oscar for his role in 'The Revenant'?",
    answer: "Leonardo DiCaprio",
  },
  {
    id: 16,
    question:
      "Which actress played the role of Hermione Granger in the 'Harry Potter' series?",
    answer: "Emma Watson",
  },
  {
    id: 17,
    question: "Who directed the movie 'The Avengers'?",
    answer: "Joss Whedon",
  },
  {
    id: 18,
    question:
      "Which movie features the character Tony Montana and the famous line 'Say hello to my little friend!'?",
    answer: "Scarface",
  },
  {
    id: 19,
    question: "In which movie does Tom Hanks play the character Forrest Gump?",
    answer: "Forrest Gump",
  },
  {
    id: 20,
    question: "Who directed the movie 'The Social Network'?",
    answer: "David Fincher",
  },
  {
    id: 21,
    question:
      "Which actress won an Academy Award for her role in 'Silver Linings Playbook'?",
    answer: "Jennifer Lawrence",
  },
  {
    id: 22,
    question: "In which year was the movie 'The Lion King' released?",
    answer: "1994",
  },
  {
    id: 23,
    question:
      "Who played the character of Iron Man in the Marvel Cinematic Universe?",
    answer: "Robert Downey Jr.",
  },
  {
    id: 24,
    question:
      "Which actor won the Best Actor Oscar for his role in 'The Godfather'?",
    answer: "Marlon Brando",
  },
  {
    id: 25,
    question: "Which movie won the Best Picture Oscar in 2021?",
    answer: "Nomadland",
  },
];
const quizzesMockedData: Quiz[] = [
  {
    id: 1,
    name: "Ultimate Movie Trivia Challenge: Test Your Film Knowledge!",
    questions: questionsMockedData.slice(0, 5),
  },
  {
    id: 2,
    name: "Cinematic Mastermind Quiz: Prove Your Movie Expertise!",
    questions: questionsMockedData.slice(0, 10),
  },
  {
    id: 3,
    name: "Blockbuster Bonanza: The Ultimate Film Trivia Extravaganza!",
    questions: questionsMockedData.slice(0, 15),
  },
  {
    id: 4,
    name: "Film Fanatic Fun: Dive into the World of Movies with this Exciting Quiz!",
    questions: questionsMockedData.slice(0, 20),
  },
  {
    id: 5,
    name: "Movie Buff Marathon: Put Your Film IQ to the Test with this Epic Quiz!",
    questions: questionsMockedData,
  },
];

export { questionsMockedData, quizzesMockedData };
