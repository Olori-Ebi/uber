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
    }
}