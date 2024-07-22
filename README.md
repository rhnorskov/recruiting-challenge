# Recruiting Challenge for Tech Lead

This repository contains my solution to the Tech Lead Recruiting Challenge. The challenge involves developing a data aggregation microservice that collects transaction data from a rate-limimted API and provides aggregated information through its own API endpoints. The solution is implemented using TypeScript and the NestJS framework.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/rhnorskov/recruiting-challenge.git
cd recruiting-challenge
```

2. Install dependencies:

```bash
pnpm install
```

## Running the Application

1. Start the application:

```bash
pnpm run start
```

2. The application will be running at http://localhost:3000.

## API Endpoints

### Get Aggregated Data by User ID

- **Endpoint:** `GET /users/:userId/aggregated-data`
- **Description:** Retrieves the aggregated data for a specific user, including balance, earned, spent, and payout amounts.
- **Example Request:**

```
GET /transactions/aggregated-data/074092
```

- **Example Response:**

```json
{
  "userId": "074092",
  "balance": 100,
  "earned": 200,
  "spent": 50,
  "payout": 30
}
```

### Get List of Requested Payouts

- **Endpoint:** `GET /transactions/payout-requests`
- **Description:** Retrieves a list of requested payouts, aggregated by user ID.
- **Example Request:**

```
GET /payouts/requests
```

- **Example Response:**

```json
{
  "payoutRequests": [
    {
      "userId": "074092",
      "payoutAmount": 60
    },
    {
      "userId": "123456",
      "payoutAmount": 100
    }
  ]
}
```

## Testing Strategy

To ensure the quality of the application, I have employed the following strategies:

- Unit Testing: Each function and service in the application is covered by unit tests. This ensures that individual components work as expected.
- Integration Testing: The interaction between different modules is tested to ensure they work together correctly.
- End-to-End Testing: The entire flow from API request to response is tested to ensure the application behaves as expected in real-world scenarios.
- Load Testing: Simulate multiple users accessing the API simultaneously to observe how the system handles high traffic.
- Stress Testing: Push the application beyond its normal operational capacity to see how it behaves under extreme conditions. This helps identify the breaking points and potential bottlenecks.

If more time were available, I would implement TDD by following these steps:

1. **Write Tests First:** Before writing any functional code, I would write tests that define the desired behavior of the application.
2. **Implement Code:** Write the minimal amount of code needed to pass the tests.
3. **Refactor:** Clean up the code while ensuring all tests still pass.
4. **Repeat:** Continue this cycle for each new feature or functionality.

## Technical Alignment

Handling queues in microservices can be approached in several ways based on my experience:

One common method is using message brokers such as RabbitMQ or Kafka. These are great for reliable message delivery and can handle various patterns like publish-subscribe and work queues. For simpler or low-volume systems, in-memory queues like Bull, which runs on Redis, might be sufficient. Alternatively, for scalable and managed solutions, cloud-based services like AWS SQS or Google Cloud Pub/Sub are excellent options.

To help our Engineering team settle on the best queue strategy, I would:

- Gather Requirements: Collect detailed requirements from different stakeholders to ensure any chosen solution meets all their needs and constraints.

- Facilitate Discussions: Set up meetings where we can weigh the pros and cons of each method, considering factors like scalability, reliability, and complexity.

- Prototype and Test: If the project timeline permits, create small prototypes for each solution to see how they perform and meet our needs.

By doing this, we can ensure our decision-making process is collaborative and well-informed.
