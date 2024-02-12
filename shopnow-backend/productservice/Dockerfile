FROM eclipse-temurin:17.0.10_7-jdk-alpine
LABEL maintainer="r15priyanshu" website="https://www.linkedin.com/in/r15priyanshu/"
RUN apk --no-cache add maven
RUN mkdir -p /app/shopnow
WORKDIR /app/shopnow
COPY . .
RUN mvn clean package -DskipTests
# Define the default command to run the application
EXPOSE 9092
CMD ["sh", "-c", "java $JAVA_OPTS -jar target/shopnow-productservice.jar"]