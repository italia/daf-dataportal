pipeline {
  agent any
  environment
  { 
      REPOSITORY='nexus.teamdigitale.test/data-portal'
  }
  stages {
    stage('Build') {
      steps { 
        script { 
          slackSend (message: "BUILD START: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' CHECK THE RESULT ON: https://cd.daf.teamdigitale.it/blue/organizations/jenkins/CI-DataPortal_Frontend/activity")         
        sh 'COMMIT_ID=$(echo ${GIT_COMMIT} | cut -c 1-6); docker build . --no-cache -t $REPOSITORY:$BUILD_NUMBER-$COMMIT_ID' 
        }
      }
    }
    stage('Test') {
      steps { //sh' != sh'' only one sh command  
      script {         
        sh '''
	COMMIT_ID=$(echo ${GIT_COMMIT} | cut -c 1-6); 
        CONTAINERID=$(docker run -d $REPOSITORY:$BUILD_NUMBER-$COMMIT_ID);
        sleep 5s;
        docker stop ${CONTAINERID}; 
        docker rm ${CONTAINERID}
	''' 
      }
    }
    }
    stage('Upload'){
      steps {
        script { 
          if(env.BRANCH_NAME=='docker_file_update' || env.BRANCH_NAME=='newSecurity'){ 
            sh 'COMMIT_ID=$(echo ${GIT_COMMIT} | cut -c 1-6); docker push $REPOSITORY:$BUILD_NUMBER-$COMMIT_ID' 
            sh 'COMMIT_ID=$(echo ${GIT_COMMIT} | cut -c 1-6); docker rmi $REPOSITORY:$BUILD_NUMBER-$COMMIT_ID'  
          }       
        }
      }
    }
   stage('Staging') {
      steps { 
        script {
          if(env.BRANCH_NAME=='docker_file_update' || env.BRANCH_NAME=='newSecurity'){
          sh ''' COMMIT_ID=$(echo ${GIT_COMMIT}|cut -c 1-6); cd kubernetes/test;
              sed "s#image: nexus.teamdigitale.test/data-.*#image: nexus.teamdigitale.test/data-portal:$BUILD_NUMBER-$COMMIT_ID#" daf_data-portal.yml > daf-dataportal$BUILD_NUMBER-$COMMIT_ID.yaml ;kubectl  --kubeconfig=${JENKINS_HOME}/.kube/config.teamdigitale-staging replace -f daf-dataportal$BUILD_NUMBER-$COMMIT_ID.yaml --force --validate=false '''             
          slackSend (color: '#00FF00', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' https://cd.daf.teamdigitale.it/blue/organizations/jenkins/CI-DataPortal_Frontend/activity")
          }
        }
      }
    }  
  }
  post { 
        failure { 
            slackSend (color: '#ff0000', message: "FAIL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' https://cd.daf.teamdigitale.it/blue/organizations/jenkins/CI-DataPortal_Frontend/activity")
        }
    }
}