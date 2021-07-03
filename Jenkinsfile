properties([pipelineTriggers([githubPush()])])

pipeline {
  agent any
  environment {
    DISCORD_WEBHOOK = credentials('discord-webhook')
  }
  stages {
    stage('clone') {
      steps {
        echo 'cloning'
      }
    }

    stage('Build') {
      steps {
        catchError {
          sh script:'''
            echo "Building"
            npm install
            npm run build
            echo "Done"
          '''
        }
      }
    }

  /*  stage('Notify') {
      when {

      environment {
        DISCORD_WEBHOOK = credentials('discord-webhook')
      }
      steps {
        discordSend description: "Jenkins Pipeline Build", footer: "", link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: DISCORD_WEBHOOK 
      }
    }*/
  }
  post {
    always {
      deleteDir()
    }
    failure {
      echo 'Failure, notifying discord'
      discordSend description: "Jenkins Pipeline Build", footer: "", link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: DISCORD_WEBHOOK 
    }
  }
}
