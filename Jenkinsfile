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
        echo 'Building'
        sh 'cd src'
        sh 'npm install'
        sh 'npm run build'
      }
    }
  }
}
