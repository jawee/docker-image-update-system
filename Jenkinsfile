properties([pipelineTriggers([githubPush()])])

pipeline {
  agent any
  environment {
    DISCORD_WEBHOOK = credentials('discord-webhook')
  }
  stages {
    stage('Execute Jobs') {
      failFast false
      parallel {
        stage('api ci') {
          when {
            changeset "api/**"
          }
          steps {
            catchError {
              load "api/Jenkinsfile"
            }
          }
        }
        stage('fe ci') {
          when {
            changeset "fe/**"
          }
          steps {
            catchError {
              load "fe/Jenkinsfile"
            }
          }
        }
      }
    }
  }
  post {
    always {
      deleteDir()
    }
    failure {
      echo 'Failure, notifying discord'
      discordSend description: "Jenkins Pipeline Build Failure", footer: "", link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: DISCORD_WEBHOOK 
    }
  }
}
