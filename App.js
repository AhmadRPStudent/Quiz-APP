
import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  ScrollView,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

// REUSABLE COMPONENT
const QuestionCard = ({
  item,
  index,
  selectedAnswer,
  onAnswerChange,
}) => {
  return (
    <View style={styles.questionCard}>
      <Text style={styles.questionNumber}>
        Question {index + 1}
      </Text>

      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.question}>
        {item.question}
      </Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedAnswer}
          onValueChange={onAnswerChange}
          style={styles.picker}
        >
          <Picker.Item
            label="Select your answer..."
            value=""
          />

          {item.options.map((option, i) => (
            <Picker.Item
              label={option}
              value={option}
              key={i}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

// MAIN APP
export default function App() {
  const [answers, setAnswers] = useState([
    '', '', '', '', '', ''
  ]);

  const questions = [
    {
      question:
        '1. What is Ultraman\'s famous finishing attack?',
      image:
        'https://tsuburaya-prod.com/wp-content/uploads/2019/05/ULM_Hero_c01.png',
      options: [
        'Spacium Beam',
        'Emerium Beam',
        'Wide Shot',
      ],
      correct: 'Spacium Beam',
    },

    {
      question:
        '2. What is the name of Ultraseven\'s weapon on his head?',
      image:
        'https://tsuburaya-prod.com/wp-content/uploads/2019/05/SEVEN_Hero01.png',
      options: [
        'Ultra Bracelet',
        'Eye Slugger',
        'Beta Capsule',
      ],
      correct: 'Eye Slugger',
    },

    {
      question:
        '3. Which three forms can Ultraman Tiga transform into?',
      image:
        'https://tsuburaya-prod.com/wp-content/uploads/2019/05/UltramanTiga_Multi_05_for_confirmation-1.png',
      options: [
        'Fire, Water and Earth',
        'Multi, Sky and Power',
        'Speed, Strength and Light',
      ],
      correct: 'Multi, Sky and Power',
    },

    {
      question:
        '4. Who is Ultraman Zero\'s father?',
      image:
        'https://tsuburaya-prod.com/wp-content/uploads/2018/02/hero_zero-1.png',
      options: [
        'Ultraman King',
        'Ultraman Belial',
        'Ultraseven',
      ],
      correct: 'Ultraseven',
    },
    {
      question: '5. Who is this Ultra Hero?',
      image: 'https://tsuburaya-prod.com/wp-content/uploads/2018/02/hero_gaia-1.png',
      options: ['Ultraman Dyna', 'Ultraman Gaia', 'Ultraman Tiga'],
      correct: 'Ultraman Gaia',
    },
    {
      question: '6. Who was Ultraman\'s golden boy before Zero?',
      image: 'https://tsuburaya-prod.com/wp-content/uploads/2021/11/Ultraman.png',
      options: ['Ultraman Mebius', 'Ultraman Taro', 'Ultraman Blazar'],
      correct: 'Ultraman Mebius',
    }
  ];

  // UPDATE SELECTED ANSWER
  const updateAnswer = (value, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  // SUBMIT QUIZ
  const submitAnswers = () => {
    if (answers.includes('')) {
      Alert.alert(
        'Incomplete Quiz',
        'Please answer all 6 questions before submitting!'
      );
      return;
    }

    let score = 0;

    questions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        score++;
      }
    });

    // DIFFERENT FEEDBACK BASED ON SCORE
    let title = '';
    let message = '';

    if (score === 6) {
      title = 'PERFECT SCORE!';
      message = 'Well done! You are a true Ultra Hero!';
    } else if (score === 5) {
      title = 'Excellent!';
      message = 'Amazing work! You know your Ultraman facts!';
    } else if (score === 4) {
      title = 'Good Effort!';
      message = 'Not bad! Keep learning about the Ultra Heroes!';
    } else if (score === 3) {
      title = 'Keep Trying!';
      message = 'You can do better next time.';
    } else {
      title = 'Mission Failed!';
      message = 'You can do better next time.';
    }

    Alert.alert(
      title,
      `You scored ${score} out of 6!\n\n${message}`,
      [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>
          ULTRAMAN QUIZ
        </Text>

        <Text style={styles.subtitle}>
          Test Your Ultraman Knowledge!
        </Text>
      </View>

      {questions.map((item, index) => (
        <QuestionCard
          key={index}
          item={item}
          index={index}
          selectedAnswer={answers[index]}
          onAnswerChange={(value) =>
            updateAnswer(value, index)
          }
        />
      ))}

      {/* SUBMIT BUTTON */}
      <View style={styles.submitButton}>
        <Button
          title="Submit Answers"
          color="#D71920"
          onPress={submitAnswers}
        />
      </View>

      <Text style={styles.footer}>
        © Ultraman Quiz - Ultra Heroes!
      </Text>
    </ScrollView>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101B3F',
  },

  header: {
    backgroundColor: '#D71920',
    padding: 25,
    alignItems: 'center',
    marginBottom: 15,
  },

  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  subtitle: {
    color: 'white',
    fontSize: 16,
    marginTop: 8,
  },

  questionCard: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 15,
    borderRadius: 12,
    elevation: 4,
  },

  questionNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D71920',
    marginBottom: 10,
  },

  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    marginBottom: 12,
  },

  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#101B3F',
    marginBottom: 15,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#D71920',
    borderRadius: 8,
    overflow: 'hidden',
  },

  picker: {
    height: 55,
    width: '100%',
  },

  submitButton: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },

  footer: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 12,
  },
});
