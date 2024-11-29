import React, { useState } from "react";
import { styles } from "../../styles";
import { mostAskedQuestions } from "../../utils";
import { questionimage } from "../../assets";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const Question = () => {
  const [showAnswer, setShowAnswer] = useState(null);

  const handleOpenAnswer = (index) => {
    setShowAnswer(showAnswer === index ? null : index);
  };

  return (
    <div className={`${styles.paddingX} flex flex-col items-center`}>
      <div className="text-center my-[40px]">
        <div className={`${styles.headerSubText}`}>FAQs</div>
        <div className={`${styles.headerText}`}>
          Most Common Questions and Answers
        </div>
      </div>
      <div className="flex gap-10 w-full justify-center">
        <img
          src={questionimage}
          alt="question_photo"
          className="w-[400px] h-[380px] rounded-xl"
        />
        <div className="flex flex-col gap-5 w-[45%]">
          {mostAskedQuestions.map((question, i) => (
            <div
              key={i}
              className="flex flex-col py-2 px-6 border-2 rounded-xl"
            >
              <button
                className="flex justify-between w-full cursor:pointer font-bold text-[23px]"
                onClick={() => handleOpenAnswer(i)}
              >
                {question.question}
                <div>
                  {showAnswer === i ? (
                    <ArrowDropDownIcon />
                  ) : (
                    <ArrowRightIcon />
                  )}
                </div>
              </button>
              <div className="text-[18px]">
                {showAnswer === i ? (
                  <div className="py-[15px]">{question.answer}</div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
