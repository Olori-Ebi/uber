pipeline {
    agent any
    tools {
        nodejs "NodeJS"
    }
    stages{
        stage('checkout'){
            steps{
                checkout scm
            }
        }
        stage('Test'){
            steps{
                sh 'echo hello world o'
                sh 'npm install'
            }
        }
        stage('Build'){
            steps{
                sh 'npm run build'
            }
        }
        stage('Build image'){
            steps{
                sh 'docker -v'
                sh 'docker build -t uber_project .'
            }
        }
        stage('Docer push'){
            steps{
                withCredentials([usernamePassword(credentialsId: 'docker_cred', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
                    sh """
                        docker login -u "$DOCKERHUB_USERNAME" -p "$DOCKERHUB_PASSWORD"
                        docker tag uber_project oloriebi95/uber_project:latest
                        docker push oloriebi95/uber_project:latest
                        docker logout
                    """
                }
            }
        }
    }
}