pipeline {
    agent any
    tools {
        nodejs "NodeJS"
        dockerTool "Docker"
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
                sh 'docer -v'
                sh 'docker build -t uber_project .'
            }
        }
    }
}