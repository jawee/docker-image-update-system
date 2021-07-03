properties([pipelineTriggers([githubPush()])])

pipeline {
  agent any
  stages {
    stage('clone') {
      steps {
        echo 'cloning'
      }
    }

    stage('Build') {
      steps {
        sh script:'''
          echo "Building"
          npm install
          npm run build
          echo "Done"
          '''
      }
    }

    stage('Notify') {
      environment {
        DISCORD_WEBHOOK = credentials('discord-webhook')
      }
      steps {
        discordSend description: "Jenkins Pipeline Build", footer: "Footer Text", link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: DISCORD_WEBHOOK 
      }
    }
  }
  post {
    always {
      deleteDir()
    }
  }
}
