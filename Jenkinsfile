def builderDocker


options {
    skipDefaultCheckout true
}

pipeline {
    agent any

    parameters {
       text(name: 'description', defaultValue: '')
       booleanParam(name:'RUNTEST',defaultValue: true, description: 'Ready For Testing')
       choice(name:'CICD',choices: ['CI', 'CICD'], description: 'Pick something')
       choice(name:'Mode',choices: ['Dev', 'Production'], description: 'Pilih dijalankan dalam mode apa ?')
    } 

  stages {
    stage('Build Project') {
      steps {
            nodejs("node12") {
            sh 'npm install'
            }
      }
    }

    stages {
        when{
            expression {
                params.Mode == 'Production'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {                    
                    builderDocker = docker.build("aldifarzum/dockerpos-frontend:production")
                }
            }
        }

        stage('Run Testing'){
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
    
        stage('Push Image'){
            when {
                expression {
                    params.RUNTEST
                }
            }
        

            steps {
                script {
                    builderDocker.push("production")
                }
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

    stages {
        when{
            expression {
                params.Mode == 'Dev'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {                    
                    builderDocker = docker.build("aldifarzum/dockerpos-frontend:master")
                }
            }
        }

        stage('Run Testing'){
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
    
        stage('Push Image'){
            when {
                expression {
                    params.RUNTEST
                }
            }
        

            steps {
                script {
                    builderDocker.push("master")
                }
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
}
