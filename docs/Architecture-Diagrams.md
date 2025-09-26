# Architecture Diagrams
## Lost & Found Smart Platform - Visual System Design

**Version:** 1.0  
**Date:** September 26, 2025  

---

## 1. System Context Diagram

```mermaid
C4Context
    title System Context Diagram - Lost & Found Smart Platform

    Person(citizen, "Citizen/Visitor", "Person who lost an item")
    Person(finder, "Finder/Partner", "Person or organization that found an item")
    Person(operator, "Government Operator", "Platform administrator")

    System(lostfound, "Lost & Found Platform", "AI-powered matching and management system")

    System_Ext(uaepass, "UAE Pass", "National identity system")
    System_Ext(dubainow, "Dubai Now", "Government services platform")
    System_Ext(partners, "Partner Systems", "Airport, hotel, mall systems")
    System_Ext(courier, "Courier Services", "Delivery and logistics")
    System_Ext(payment, "Payment Gateway", "Secure payment processing")

    Rel(citizen, lostfound, "Reports lost items, tracks status")
    Rel(finder, lostfound, "Submits found items")
    Rel(operator, lostfound, "Manages platform, monitors operations")

    Rel(lostfound, uaepass, "Authenticates users")
    Rel(lostfound, dubainow, "Sends notifications")
    Rel(lostfound, partners, "Receives found items")
    Rel(lostfound, courier, "Arranges delivery")
    Rel(lostfound, payment, "Processes payments")
```

---

## 2. Container Diagram

```mermaid
C4Container
    title Container Diagram - Lost & Found Smart Platform

    Person(user, "Platform Users", "Citizens, finders, operators")

    Container_Boundary(c1, "Lost & Found Platform") {
        Container(web, "Web Application", "React, Chakra UI", "Responsive web interface")
        Container(mobile, "Mobile App", "React Native", "Native mobile experience")
        Container(api, "API Gateway", "Kong/Istio", "API management and security")
        
        Container(llm, "LLM Service", "GPT-4/Claude", "Conversational AI interface")
        Container(agents, "Agent Orchestrator", "LangGraph", "AI workflow management")
        Container(vector, "Vector Store", "Pinecone", "Similarity search")
        
        Container(intake, "Intake Service", "Node.js/NestJS", "Item registration")
        Container(matching, "Matching Service", "Python/FastAPI", "AI-powered matching")
        Container(custody, "Custody Service", "Node.js/NestJS", "Chain of custody")
        Container(notify, "Notification Service", "Node.js/NestJS", "Multi-channel notifications")
        Container(partner, "Partner Service", "Node.js/NestJS", "Partner integrations")
        Container(auth, "Auth Service", "Keycloak", "Authentication & authorization")
        
        ContainerDb(db, "Database", "PostgreSQL", "Transactional data")
        ContainerDb(cache, "Cache", "Redis", "Session & temporary data")
        ContainerDb(files, "File Storage", "S3", "Images and documents")
        ContainerDb(audit, "Audit Store", "immudb", "Immutable audit logs")
    }

    System_Ext(external, "External Systems", "UAE Pass, Dubai Now, Partners")

    Rel(user, web, "Uses", "HTTPS")
    Rel(user, mobile, "Uses", "HTTPS")
    
    Rel(web, api, "API calls", "JSON/HTTPS")
    Rel(mobile, api, "API calls", "JSON/HTTPS")
    
    Rel(api, auth, "Authenticates", "JWT")
    Rel(api, intake, "Routes requests")
    Rel(api, matching, "Routes requests")
    Rel(api, custody, "Routes requests")
    Rel(api, notify, "Routes requests")
    Rel(api, partner, "Routes requests")
    
    Rel(intake, llm, "Processes input", "REST")
    Rel(matching, agents, "Triggers workflows", "gRPC")
    Rel(agents, vector, "Similarity search", "REST")
    
    Rel(intake, db, "Stores data", "SQL")
    Rel(matching, db, "Reads/writes", "SQL")
    Rel(custody, db, "Stores events", "SQL")
    Rel(notify, cache, "Queues messages", "Redis")
    Rel(partner, files, "Stores files", "S3 API")
    
    Rel_Back(custody, audit, "Logs events", "Append-only")
    Rel(auth, external, "Integrates", "SAML/OIDC")
```

---

## 3. Component Diagram - AI/Agent Layer

```mermaid
C4Component
    title Component Diagram - AI/Agent Layer

    Container_Boundary(ai, "AI/Agent Layer") {
        Component(llm_gateway, "LLM Gateway", "FastAPI", "LLM request routing and caching")
        Component(prompt_mgr, "Prompt Manager", "Python", "Prompt templates and versioning")
        Component(safety, "Safety Filter", "Python", "Content moderation and safety")
        
        Component(orchestrator, "Agent Orchestrator", "LangGraph", "Workflow coordination")
        Component(intake_agent, "Intake Agent", "Python", "Conversational data collection")
        Component(match_agent, "Matching Agent", "Python", "Similarity matching logic")
        Component(partner_agent, "Partner Agent", "Python", "External system integration")
        Component(fulfill_agent, "Fulfillment Agent", "Python", "Return process management")
        Component(gov_agent, "Governance Agent", "Python", "Compliance and audit")
        
        Component(vector_mgr, "Vector Manager", "Python", "Embedding generation and search")
        Component(image_proc, "Image Processor", "Python/OpenCV", "Image analysis and OCR")
        Component(text_proc, "Text Processor", "spaCy/Transformers", "NLP and entity extraction")
        
        ComponentDb(embeddings, "Vector Database", "Pinecone", "Item embeddings")
        ComponentDb(models, "Model Store", "MLflow", "Model versioning and deployment")
    }

    Container_Ext(llm_provider, "LLM Provider", "Azure OpenAI/Anthropic")
    Container_Ext(services, "Application Services", "Intake, Matching, etc.")

    Rel(services, llm_gateway, "AI requests", "REST/gRPC")
    Rel(llm_gateway, prompt_mgr, "Gets prompts")
    Rel(llm_gateway, safety, "Filters content")
    Rel(llm_gateway, llm_provider, "LLM calls", "HTTPS")
    
    Rel(services, orchestrator, "Triggers workflows")
    Rel(orchestrator, intake_agent, "Delegates tasks")
    Rel(orchestrator, match_agent, "Delegates tasks")
    Rel(orchestrator, partner_agent, "Delegates tasks")
    Rel(orchestrator, fulfill_agent, "Delegates tasks")
    Rel(orchestrator, gov_agent, "Delegates tasks")
    
    Rel(intake_agent, text_proc, "Extracts entities")
    Rel(intake_agent, image_proc, "Processes images")
    Rel(match_agent, vector_mgr, "Similarity search")
    Rel(vector_mgr, embeddings, "Stores/queries", "Vector API")
    
    Rel(image_proc, models, "Loads models")
    Rel(text_proc, models, "Loads models")
```

---

## 4. Data Flow Diagram - Lost Item Journey

```mermaid
flowchart TD
    A[Citizen Reports Lost Item] --> B[LLM Intake Conversation]
    B --> C{Complete Information?}
    C -->|No| D[Request Additional Details]
    D --> B
    C -->|Yes| E[Generate Item Embedding]
    E --> F[Store in Database]
    F --> G[Trigger Matching Agent]
    
    G --> H[Search Vector Database]
    H --> I[Apply Filters<br/>Location, Time, Category]
    I --> J{Matches Found?}
    
    J -->|Yes| K[Rank by Confidence]
    K --> L[Human Review Queue]
    L --> M{Verified Match?}
    M -->|Yes| N[Notify Both Parties]
    M -->|No| O[Continue Monitoring]
    
    J -->|No| O
    O --> P[Periodic Re-matching]
    P --> H
    
    N --> Q[Identity Verification]
    Q --> R[Schedule Return]
    R --> S[Complete Transaction]
    S --> T[Update Audit Trail]
    
    style A fill:#e1f5fe
    style N fill:#c8e6c9
    style S fill:#c8e6c9
    style T fill:#fff3e0
```

---

## 5. Data Flow Diagram - Found Item Journey

```mermaid
flowchart TD
    A[Partner Submits Found Item] --> B[API Authentication]
    B --> C[Data Validation]
    C --> D{Valid Submission?}
    D -->|No| E[Return Error Response]
    D -->|Yes| F[Process Images/OCR]
    
    F --> G[Extract Metadata]
    G --> H[Generate Embeddings]
    H --> I[Store in Database]
    I --> J[Immediate Matching Check]
    
    J --> K{Potential Matches?}
    K -->|Yes| L[Calculate Confidence Scores]
    L --> M[Queue for Review]
    M --> N[Notify Potential Owners]
    
    K -->|No| O[Add to Monitoring Pool]
    O --> P[Generate Custody Labels]
    P --> Q[Update Partner Dashboard]
    
    N --> R[Owner Verification Process]
    R --> S{Ownership Confirmed?}
    S -->|Yes| T[Arrange Return]
    S -->|No| U[Flag as False Match]
    U --> O
    
    T --> V[Complete Chain of Custody]
    V --> W[Update All Systems]
    W --> X[Generate Certificates]
    
    style A fill:#e8f5e8
    style N fill:#fff3e0
    style T fill:#c8e6c9
    style X fill:#c8e6c9
```

---

## 6. Security Architecture Diagram

```mermaid
graph TB
    subgraph "Internet"
        USER[Users]
        PARTNER[Partners]
        THREAT[Threats]
    end
    
    subgraph "DMZ"
        WAF[Web Application Firewall]
        LB[Load Balancer<br/>DDoS Protection]
        PROXY[Reverse Proxy<br/>TLS Termination]
    end
    
    subgraph "Application Zone"
        subgraph "Security Services"
            AUTH[Authentication Service<br/>Keycloak + MFA]
            AUTHZ[Authorization Service<br/>RBAC Engine]
            AUDIT[Audit Service<br/>Immutable Logs]
        end
        
        subgraph "Business Services"
            API[API Gateway<br/>Rate Limiting]
            SERVICES[Microservices<br/>mTLS Communication]
        end
    end
    
    subgraph "Data Zone"
        subgraph "Encrypted Storage"
            DB[(Database<br/>AES-256 Encryption)]
            FILES[(File Storage<br/>Encrypted at Rest)]
            CACHE[(Cache<br/>Encrypted Sessions)]
        end
        
        subgraph "Security Infrastructure"
            HSM[Hardware Security Module<br/>Key Management]
            SIEM[SIEM System<br/>Security Monitoring]
            BACKUP[(Encrypted Backups<br/>Cross-Region)]
        end
    end
    
    USER --> WAF
    PARTNER --> WAF
    THREAT -.->|Blocked| WAF
    
    WAF --> LB
    LB --> PROXY
    PROXY --> API
    
    API --> AUTH
    API --> AUTHZ
    API --> SERVICES
    
    SERVICES --> DB
    SERVICES --> FILES
    SERVICES --> CACHE
    
    AUTH --> HSM
    AUTHZ --> HSM
    AUDIT --> SIEM
    
    DB --> BACKUP
    FILES --> BACKUP
    
    style WAF fill:#ffcdd2
    style AUTH fill:#c8e6c9
    style HSM fill:#fff3e0
    style SIEM fill:#e1f5fe
    style AUDIT fill:#fff3e0
```

---

## 7. Deployment Architecture Diagram

```mermaid
graph TB
    subgraph "Production Environment"
        subgraph "Kubernetes Cluster - Zone A"
            subgraph "Namespace: frontend"
                WEB_A[Web App Pods]
                API_A[API Gateway Pods]
            end
            
            subgraph "Namespace: services"
                SVC_A[Service Pods<br/>Intake, Matching, etc.]
                AI_A[AI/Agent Pods]
            end
            
            subgraph "Namespace: data"
                DB_A[(PostgreSQL Primary)]
                REDIS_A[(Redis Cluster)]
            end
        end
        
        subgraph "Kubernetes Cluster - Zone B"
            subgraph "Namespace: frontend"
                WEB_B[Web App Pods]
                API_B[API Gateway Pods]
            end
            
            subgraph "Namespace: services"
                SVC_B[Service Pods<br/>Intake, Matching, etc.]
                AI_B[AI/Agent Pods]
            end
            
            subgraph "Namespace: data"
                DB_B[(PostgreSQL Replica)]
                REDIS_B[(Redis Cluster)]
            end
        end
        
        subgraph "Shared Services"
            STORAGE[(Object Storage<br/>Cross-Zone Replication)]
            MONITOR[Monitoring Stack<br/>Prometheus + Grafana]
            LOG[Logging Stack<br/>ELK + Fluentd]
            VAULT[HashiCorp Vault<br/>Secrets Management]
        end
    end
    
    subgraph "External Services"
        UAE[UAE Pass]
        DUBAI[Dubai Now]
        PARTNERS[Partner Systems]
        LLM[LLM Provider<br/>Azure OpenAI]
    end
    
    subgraph "CI/CD Pipeline"
        GIT[Git Repository]
        BUILD[Build Pipeline<br/>GitHub Actions]
        REGISTRY[Container Registry]
        DEPLOY[ArgoCD<br/>GitOps Deployment]
    end
    
    WEB_A -.-> WEB_B
    API_A -.-> API_B
    SVC_A -.-> SVC_B
    AI_A -.-> AI_B
    
    DB_A --> DB_B
    REDIS_A -.-> REDIS_B
    
    SVC_A --> STORAGE
    SVC_B --> STORAGE
    
    API_A --> UAE
    API_B --> DUBAI
    SVC_A --> PARTNERS
    AI_A --> LLM
    
    GIT --> BUILD
    BUILD --> REGISTRY
    REGISTRY --> DEPLOY
    DEPLOY --> SVC_A
    DEPLOY --> SVC_B
    
    style DB_A fill:#c8e6c9
    style DB_B fill:#e8f5e8
    style STORAGE fill:#fff3e0
    style VAULT fill:#ffcdd2
    style MONITOR fill:#e1f5fe
```

---

## 8. Network Architecture Diagram

```mermaid
graph TB
    subgraph "Internet"
        USERS[End Users]
        PARTNERS[Partner Systems]
    end
    
    subgraph "Edge Network"
        CDN[Content Delivery Network]
        DNS[DNS Load Balancer]
        WAF[Web Application Firewall]
    end
    
    subgraph "DMZ - Public Subnet"
        ALB[Application Load Balancer<br/>10.0.1.0/24]
        NAT[NAT Gateway]
    end
    
    subgraph "Application Tier - Private Subnet"
        K8S_A[Kubernetes Cluster A<br/>10.0.10.0/24]
        K8S_B[Kubernetes Cluster B<br/>10.0.11.0/24]
        BASTION[Bastion Host<br/>10.0.12.10]
    end
    
    subgraph "Data Tier - Private Subnet"
        DB_PRIMARY[(Database Primary<br/>10.0.20.10)]
        DB_REPLICA[(Database Replica<br/>10.0.21.10)]
        CACHE_A[(Redis Cluster A<br/>10.0.20.20-22)]
        CACHE_B[(Redis Cluster B<br/>10.0.21.20-22)]
    end
    
    subgraph "Management Tier - Private Subnet"
        MONITOR[Monitoring<br/>10.0.30.10]
        LOGGING[Logging<br/>10.0.30.20]
        BACKUP[Backup<br/>10.0.30.30]
        VAULT[Vault<br/>10.0.30.40]
    end
    
    subgraph "External Connections"
        VPN[VPN Gateway<br/>Site-to-Site]
        PEERING[VPC Peering<br/>Government Networks]
    end
    
    USERS --> CDN
    USERS --> DNS
    PARTNERS --> WAF
    
    CDN --> ALB
    DNS --> ALB
    WAF --> ALB
    
    ALB --> K8S_A
    ALB --> K8S_B
    
    K8S_A --> DB_PRIMARY
    K8S_B --> DB_REPLICA
    K8S_A --> CACHE_A
    K8S_B --> CACHE_B
    
    K8S_A --> NAT
    K8S_B --> NAT
    
    BASTION --> K8S_A
    BASTION --> K8S_B
    BASTION --> DB_PRIMARY
    
    K8S_A --> MONITOR
    K8S_B --> MONITOR
    K8S_A --> LOGGING
    K8S_B --> LOGGING
    
    DB_PRIMARY --> BACKUP
    DB_REPLICA --> BACKUP
    
    VAULT --> K8S_A
    VAULT --> K8S_B
    
    VPN --> BASTION
    PEERING --> ALB
    
    style ALB fill:#e1f5fe
    style K8S_A fill:#c8e6c9
    style K8S_B fill:#c8e6c9
    style DB_PRIMARY fill:#fff3e0
    style VAULT fill:#ffcdd2
```

---

## 9. Monitoring & Observability Architecture

```mermaid
graph TB
    subgraph "Application Layer"
        APPS[Applications<br/>Microservices]
        AGENTS[AI Agents]
        APIS[API Gateway]
    end
    
    subgraph "Data Collection"
        OTEL[OpenTelemetry<br/>Collector]
        FLUENTD[Fluentd<br/>Log Collector]
        PROM_AGENT[Prometheus<br/>Node Exporter]
    end
    
    subgraph "Storage & Processing"
        PROM[(Prometheus<br/>Metrics Store)]
        JAEGER[(Jaeger<br/>Trace Store)]
        ELK[(Elasticsearch<br/>Log Store)]
    end
    
    subgraph "Visualization & Alerting"
        GRAFANA[Grafana<br/>Dashboards]
        KIBANA[Kibana<br/>Log Analysis]
        ALERT[AlertManager<br/>Alert Routing]
    end
    
    subgraph "Notification Channels"
        SLACK[Slack]
        EMAIL[Email]
        PAGER[PagerDuty]
        SMS[SMS Gateway]
    end
    
    subgraph "External Monitoring"
        UPTIME[Uptime Monitoring<br/>Pingdom/StatusPage]
        APM[Application Performance<br/>New Relic/DataDog]
        SECURITY[Security Monitoring<br/>SIEM Integration]
    end
    
    APPS --> OTEL
    AGENTS --> OTEL
    APIS --> OTEL
    
    APPS --> FLUENTD
    AGENTS --> FLUENTD
    APIS --> FLUENTD
    
    APPS --> PROM_AGENT
    
    OTEL --> PROM
    OTEL --> JAEGER
    FLUENTD --> ELK
    PROM_AGENT --> PROM
    
    PROM --> GRAFANA
    JAEGER --> GRAFANA
    ELK --> KIBANA
    PROM --> ALERT
    
    ALERT --> SLACK
    ALERT --> EMAIL
    ALERT --> PAGER
    ALERT --> SMS
    
    APIS --> UPTIME
    APPS --> APM
    ELK --> SECURITY
    
    style OTEL fill:#e1f5fe
    style PROM fill:#c8e6c9
    style GRAFANA fill:#fff3e0
    style ALERT fill:#ffcdd2
```

---

**Document Control:**
- Version: 1.0
- Last Updated: September 26, 2025
- Next Review: October 10, 2025
- Classification: Internal Use Only
