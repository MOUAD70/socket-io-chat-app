pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "socket-io-chat-app"
        MONGO_URI = "mongodb+srv://mouad_db_user:dOk4X4TOZQXqjyBQ@chat-app-cluster.jtuwgk3.mongodb.net/chat-app-db?appName=chat-app-cluster"
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
                    sh 'docker-compose down || echo "No containers to stop"'
                }
            }
        }

        stage('Build & Run Containers') {
            steps {
                script {
                    sh 'docker-compose up -d --build'
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
