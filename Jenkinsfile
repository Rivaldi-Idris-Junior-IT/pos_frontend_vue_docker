def branch

pipeline {
    agent any

    paramaters {
       booleanParam(name:'RUNTEST',defaultValue: true, description: 'Toggle this value for testing')
       choice(name:'CICD',choices: ['CI', 'CICD'], description: 'Pick something')       
    } 

  stages {
    stage('Build Project') {
      steps {
       echo 'build...'
      }
    }

   stage('Run Testing') {
        when {
            expression {
                BRANCH NAME == "mater" || BRANCH_NAME == "staging"
            }
        }
        steps {
        echo 'Testing...'
        }
   }

   stage('Deploy') {
       steps {
           echo 'Testing...'
       }
   }

  }
}
