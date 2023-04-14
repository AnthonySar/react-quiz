import React, { useState, useEffect } from 'react';
import Stepper from 'react-stepper-horizontal';


const Levels = (props) => {
  const { levelNames, quizLevel } = props;
  const [levels, setLevels] = useState([]); 

  useEffect(() => {
    const quizSteps = levelNames.map(level => ({title: level.toUpperCase()}));
    setLevels(quizSteps)
  }, [levelNames]);

  return (
    <div className='levelsContainer'>
        <Stepper 
            steps={levels} 
            activeStep={quizLevel} 
            circleTop={0}
            activeTitleColor={'#FF6961'}
            activeColor={'#FF6961'}
            completeTitleColor={'#C0C0C0'}
            defaultTitleColor={'#C0C0C0'}
            completeColor={'#C0C0C0'}
            completeBarColor={'#C0C0C0'}
            barStyle={'dashed'}
            size={35}
            circleFontSize={16}
          />
    </div>
  )
}

export default React.memo(Levels);