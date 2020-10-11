def branch

pipeline {
    agent any

    paramaters {
       booleanParam(name:'RUNTEST',defaultValue: true, description: 'Toggle this value for testing')
       choice(name:'CICD',choices: ['CI', 'CICD'], description: 'Pick something')       
    } 

  stages {
    stage('Build Project') {
      step {
       echo 'build...'
      }
    }

   stage('Run Testing') {
        when {
            expression {
                BRANCH NAME == "mater" || BRANCH_NAME == "staging"
            }
        }
        step {
        echo 'Testing...'
        }
   }

   stage('Deploy') {
       step {
           echo 'Testing...'
       }
   }

  }
}
