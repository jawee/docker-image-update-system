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
  }
  post {
    always {
      deleteDir()
    }
  }
}
