pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "socket-io-chat-app"
        DB_CONNECTION_STRING = credentials('MONGODB_URI_SECRET')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/MOUAD70/socket-io-chat-app.git'
            }
        }

        stage('Stop Previous Containers') {
            steps {
                script {
                    sh 'docker compose down || echo "No containers to stop"'
                }
            }
        }

        stage('Build & Run Containers') {
            steps {
                script {
                    sh 'docker compose up -d --build'
                }
            }
        }

        stage('Verify Containers') {
            steps {
                script {
                    sh 'docker ps'
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline finished!"
        }
    }
}
