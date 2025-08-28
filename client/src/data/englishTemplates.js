export const englishTemplates = [
  {
    id: 'grammar-basics',
    title: 'Grammar Basics',
    description: 'Identify grammatically correct sentences and fix common mistakes.',
    questions: [
      {
        question: 'Choose the grammatically correct sentence.',
        options: [
          'She don’t like apples.',
          'She doesn’t likes apples.',
          'She doesn’t like apples.',
          'She not like apples.'
        ],
        correctAnswer: 'She doesn’t like apples.'
      },
      {
        question: 'Select the correct form: “Neither of the answers ___ correct.”',
        options: ['are', 'is', 'be', 'were'],
        correctAnswer: 'is'
      },
      {
        question: 'Pick the sentence with correct punctuation.',
        options: [
          'It’s raining, bring an umbrella.',
          'Its raining; bring an umbrella.',
          'It’s raining; bring an umbrella.',
          'Its raining, bring an umbrella.'
        ],
        correctAnswer: 'It’s raining; bring an umbrella.'
      },
      {
        question: 'Fill in the blank: “He has lived here ___ 2010.”',
        options: ['for', 'since', 'from', 'at'],
        correctAnswer: 'since'
      }
    ]
  },
  {
    id: 'vocabulary-synonyms',
    title: 'Vocabulary: Synonyms',
    description: 'Find the closest synonym for the given word.',
    questions: [
      {
        question: 'Select the synonym of “abundant”.',
        options: ['scarce', 'plentiful', 'meager', 'minimal'],
        correctAnswer: 'plentiful'
      },
      {
        question: 'Select the synonym of “concise”.',
        options: ['wordy', 'succinct', 'elaborate', 'lengthy'],
        correctAnswer: 'succinct'
      },
      {
        question: 'Select the synonym of “diligent”.',
        options: ['lazy', 'indifferent', 'hardworking', 'careless'],
        correctAnswer: 'hardworking'
      }
    ]
  },
  {
    id: 'reading-comprehension',
    title: 'Reading Comprehension (Short)',
    description: 'Answer questions based on a brief passage.',
    questions: [
      {
        question: '“The committee has reached its decision.” What is the subject-verb agreement here?',
        options: [
          'Plural subject with plural verb',
          'Singular subject with singular verb',
          'Plural subject with singular verb',
          'Singular subject with plural verb'
        ],
        correctAnswer: 'Singular subject with singular verb'
      },
      {
        question: '“Despite the rain, the match continued.” What is the function of “Despite the rain”?',
        options: ['Main clause', 'Prepositional phrase', 'Gerund phrase', 'Appositive'],
        correctAnswer: 'Prepositional phrase'
      }
    ]
  }
];


