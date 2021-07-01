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
          echo "This is start $(pwd)"
          cd ./src
          echo "Changed to dir $(pwd)"
          npm install
          npm run build
          echo "Done building"
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
