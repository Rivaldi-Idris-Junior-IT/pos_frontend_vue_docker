def builderDocker
def CommitHash

pipeline {
    agent any

    parameters {
       booleanParam(name:'RUNTEST',defaultValue: true, description: 'Toggle this value for testing')
       choice(name:'CICD',choices: ['CI', 'CICD'], description: 'Pick something')
       choice(name:'Mode',choices: ['master', 'production'], description: 'Pili mode push')
    } 

  stages {
    stage('Build Project') {
      steps {
            nodejs("node12") {
            sh 'npm install'
            }
      }
    }

   stage('Build Docker Images') {

       steps{
           script {
                CommitHash = sh (script : "git log -n 1 --pretty=format:'%H'", returnStdout:true)
                builderDocker = docker.build("aldifarzum/dockerpos-frontend:${CommitHash}")
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
            script {
                builderDocker.inside {
                    sh 'echo passed'
                }
            }
        }
   }

   stage('Push Image') {
        if (params.Mode == '${CommitHash}'){
            builderDocker.push("${env.GIT_BRANCH}")
        }else{
            currentBuild.result = 'ABORTED'
            error('Branch tidak sesuai')
        }                
   }

   stage('Deploy') {
       when {
           expression {
               params.CICD == 'CICD'
           }
       }
       
       steps {
        script {
            sshPublisher(
                publishers: [
                    sshPublisherDesc(
                         configName: 'Development',
                         verbose: false,
                        transfers: [                                 
                            sshTransfer(
                                execCommand: 'docker pull aldifarzum/dockerpos-frontend:master; docker kill frontend; docker run -d --rm --name frontend -p 8080:80 aldifarzum/dockerpos-frontend:master',
                                execTimeout: 120000,
                            )
                        ]
                    )
                ]
            )
        }
       }
   }

  }
}
