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
        echo 'This is start $(pwd)'
        sh 'cd ./src'
        echo 'Changed to dir $(pwd)'
        sh 'npm install'
        sh 'npm run build'
      }
    }
  }
}
