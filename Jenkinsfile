def branch

pipeline {
    agent any

    parameters {
       booleanParam(name:'RUNTEST',defaultValue: true, description: 'Toggle this value for testing')
       choice(name:'CICD',choices: ['CI', 'CICD'], description: 'Pick something')       
    } 

  stages {
    stage('Build Project') {
      steps {
       nodejs("nodejs12")
       sh 'npm install'
      }
    }

   stage('Build Docker Images') {

       steps{
           script {
                CommitHash = sh (script : "git log -n 1 --pretty=format:'%H'", returnStdout:true)
           }
       }
   }

   stage('Run Testing') {
        when {
            expression {
                params.RUNTEST
            }
        }
        steps {
        echo 'Testing...'
        }
   }

   stage('Deploy') {
       when {
           expression {
               params.CICD == 'CICD'
           }
       }
       steps {
        echo 'Deploy...'
        }
   }

  }
}
