package com.ali.blog.config;

import com.ali.blog.entity.AdminUser;
import com.ali.blog.entity.Category;
import com.ali.blog.entity.Post;
import com.ali.blog.repository.AdminUserRepository;
import com.ali.blog.repository.CategoryRepository;
import com.ali.blog.repository.PostRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;

@Component
public class DataSeeder implements CommandLineRunner {

    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.email}")
    private String adminEmail;

    @Value("${admin.password}")
    private String adminPassword;

    public DataSeeder(PostRepository postRepository, CategoryRepository categoryRepository, AdminUserRepository adminUserRepository, PasswordEncoder passwordEncoder) {
        this.postRepository = postRepository;
        this.categoryRepository = categoryRepository;
        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public void run(String... args) {
        if (adminUserRepository.findByEmail(adminEmail).isEmpty()) {
            AdminUser admin = new AdminUser(adminEmail, passwordEncoder.encode(adminPassword));
            adminUserRepository.save(admin);

        }


        if (postRepository.count() >= 30) {
            return;
        }

        Category javaCategory = categoryRepository.save(new Category("Java", "java"));
        Category n4Category = categoryRepository.save(new Category("Navis", "navis"));
        Category cSharpCategory = categoryRepository.save(new Category("CSharp", "csharp"));
        Category typescriptCategory = categoryRepository.save(new Category("Typescript", "typescript"));
        Category reactCategory = categoryRepository.save(new Category("React", "react"));

        savePost(new Post("Java Serialization Notes", "java-serialization-notes", "Serialization taught me an important lesson: objects are temporary unless we intentionally preserve their state. In Java, native serialization converts an object into bytes so it can be saved and restored later. Understanding this helped me see the difference between object state, memory, files, and long-term persistence.", "Important notes about Java serialization and deserialization.", javaCategory));

        savePost(new Post("Why I Started Taking Java Seriously", "why-i-started-taking-java-seriously", "Java is not just syntax. It is a platform, an ecosystem, and a way to think about software design. As I practiced Swing, file I/O, streams, and object-oriented design, I started seeing how much depth the language has. The more I learned, the more I respected the fundamentals.", "A personal reflection on learning Java deeply.", javaCategory));

        savePost(new Post("Understanding Objects Through Practice", "understanding-objects-through-practice", "The best way to understand objects is to build small applications and observe how state moves through the system. A class is not just a container for fields and methods. A good object protects its state, exposes meaningful behavior, and fits clearly into the larger design.", "How practice apps helped me understand objects better.", javaCategory));

        savePost(new Post("Java File I/O Made Practical", "java-file-io-made-practical", "Working with files made Java feel closer to the real machine. Reading and writing text files showed me how programs communicate with the outside world. BufferedReader, BufferedWriter, and file paths are simple tools, but they teach important lessons about persistence and data flow.", "Practical notes about reading and writing files in Java.", javaCategory));

        savePost(new Post("Why Constructors Matter in Java", "why-constructors-matter-in-java", "Constructors define how an object begins its life. They are not just syntax. They protect required fields, prevent invalid objects, and make the intent of a class clearer. The more I practiced, the more I saw constructors as part of good design, not just object creation.", "A short reflection on constructors and object validity.", javaCategory));

        savePost(new Post("Learning Java Through Small Desktop Apps", "learning-java-through-small-desktop-apps", "Building small desktop apps with Swing helped me understand events, callbacks, repainting, layouts, and state changes. Even simple UI apps teach powerful lessons because they force the developer to think about user actions, object communication, and screen updates.", "Why Swing practice is valuable for Java fundamentals.", javaCategory));

        savePost(new Post("Spring Boot Controllers Explained Simply", "spring-boot-controllers-explained-simply", "A controller is the entry point into a backend feature. It receives HTTP requests, validates input, and delegates real work to the service layer. Keeping controllers thin makes the application easier to read, test, and maintain.", "A simple explanation of Spring Boot controllers.", cSharpCategory));

        savePost(new Post("DTOs Changed How I Think About APIs", "dtos-changed-how-i-think-about-apis", "DTOs separate the internal database model from the external API contract. This is a serious backend habit. Entities represent persistence, while DTOs represent communication. Once this clicked, API design started to feel cleaner and more intentional.", "Why DTOs are important in clean API design.", cSharpCategory));

        savePost(new Post("Repository Pattern in Spring Data JPA", "repository-pattern-in-spring-data-jpa", "Spring Data JPA repositories are powerful because they allow developers to define intent through interfaces. Methods like findBySlug and existsByEmail show how naming conventions can generate real database queries with very little code.", "How Spring Data repositories simplify database access.", cSharpCategory));

        savePost(new Post("What I Learned Comparing .NET and Spring Boot", "what-i-learned-comparing-dotnet-and-spring-boot", "Coming from .NET made Spring Boot easier to understand. Controllers, services, dependency injection, repositories, and configuration all have familiar ideas. The syntax is different, but the engineering principles are very similar.", "A practical comparison between .NET APIs and Spring Boot.", cSharpCategory));

        savePost(new Post("Why Validation Belongs at the API Boundary", "why-validation-belongs-at-the-api-boundary", "Validation protects the backend from bad input. Using annotations like NotBlank, Size, and Email makes the rules visible and consistent. A professional API should reject invalid requests early and return clear messages to the client.", "Notes on request validation in backend APIs.", cSharpCategory));

        savePost(new Post("Clean Error Handling in Spring Boot", "clean-error-handling-in-spring-boot", "Global exception handling makes APIs more predictable. Instead of random stack traces or inconsistent errors, the backend can return clear responses like 404 Not Found, 409 Conflict, and 400 Bad Request. This is part of building professional APIs.", "Why centralized exception handling matters.", cSharpCategory));

        savePost(new Post("TypeScript Makes React Safer", "typescript-makes-react-safer", "TypeScript adds structure to frontend development. It helps catch mistakes earlier, makes components easier to understand, and gives confidence when refactoring. For larger React apps, TypeScript is not just nice to have. It becomes a productivity tool.", "Why TypeScript is valuable in React projects.", typescriptCategory));

        savePost(new Post("Thinking in Types", "thinking-in-types", "Types describe the shape of data moving through an application. When used well, they document intent and reduce confusion. Whether working with DTOs from the backend or props in React, strong typing helps keep the frontend honest.", "How TypeScript improves data modeling.", typescriptCategory));

        savePost(new Post("React Props and Backend DTOs", "react-props-and-backend-dtos", "React props and backend DTOs are connected ideas. Both define what data a component or API endpoint expects. When the backend response is clean, the frontend becomes easier to build because the data shape is predictable.", "Connecting frontend props with backend response models.", typescriptCategory));

        savePost(new Post("Why I Prefer Clear Interfaces", "why-i-prefer-clear-interfaces", "Interfaces make frontend code easier to reason about. They show what a component expects and what a service returns. In a full-stack app, clear interfaces reduce guessing between frontend and backend development.", "Notes on using interfaces for clearer frontend code.", typescriptCategory));

        savePost(new Post("Avoiding Any in TypeScript", "avoiding-any-in-typescript", "Using any can feel fast, but it removes the protection TypeScript gives us. A better habit is to define real types, even if they are simple at first. This keeps the codebase safer as the application grows.", "Why avoiding any improves TypeScript quality.", typescriptCategory));

        savePost(new Post("Frontend Confidence Through Type Safety", "frontend-confidence-through-type-safety", "Type safety gives confidence when changing code. When API responses, component props, and form values are typed properly, refactoring becomes less risky. This is especially important in admin dashboards and data-heavy screens.", "How types make frontend refactoring safer.", typescriptCategory));

        savePost(new Post("React Components Should Have Clear Responsibilities", "react-components-should-have-clear-responsibilities", "A good React component should have a clear reason to exist. Some components display data, some manage forms, and some handle layout. Keeping responsibilities clear makes the UI easier to maintain and improve.", "A practical note on React component design.", reactCategory));

        savePost(new Post("Material UI for Professional Dashboards", "material-ui-for-professional-dashboards", "Material UI is useful because it provides reliable building blocks for real applications. Cards, tables, dialogs, buttons, and form controls help developers build clean interfaces faster while still keeping room for custom design.", "Why Material UI is a strong choice for admin dashboards.", reactCategory));

        savePost(new Post("Building a Blog UI That Readers Enjoy", "building-a-blog-ui-that-readers-enjoy", "A blog interface should be readable before anything else. Good spacing, clean typography, clear categories, and a focused article layout matter more than flashy effects. The goal is to make readers stay because the experience feels comfortable.", "Thoughts on designing a readable blog frontend.", reactCategory));

        savePost(new Post("React Forms and API Requests", "react-forms-and-api-requests", "Forms are where frontend and backend meet. A good form collects data clearly, validates user input, sends clean requests, and handles errors gracefully. This is especially important for admin features like creating and editing posts.", "How React forms connect to backend APIs.", reactCategory));

        savePost(new Post("Why State Management Matters", "why-state-management-matters", "State management is about knowing where data lives and who is responsible for changing it. Even before using advanced libraries, developers should understand local state, server state, loading states, and error states.", "A practical reflection on state in React apps.", reactCategory));

        savePost(new Post("Designing a Developer Blog Homepage", "designing-a-developer-blog-homepage", "A strong developer blog homepage should quickly explain who the author is, what topics are covered, and why readers should return. Featured posts, categories, and a newsletter section can turn a simple blog into a real platform.", "Ideas for building a strong developer blog homepage.", reactCategory));

        savePost(new Post("Lessons From Working With Navis N4", "lessons-from-working-with-navis-n4", "Working with Navis N4 teaches patience, precision, and respect for business rules. Terminal systems are not just technical platforms. They connect operations, billing, EDI, reporting, and real-world workflows where small mistakes can have large effects.", "Professional lessons learned from Navis N4 work.", n4Category));

        savePost(new Post("EDI Workflows Require Clear Thinking", "edi-workflows-require-clear-thinking", "EDI work is about structured communication between systems. Files, mappings, message types, and validation rules all have to align. When something fails, careful tracing is more valuable than guessing.", "Why EDI development requires precision.", n4Category));

        savePost(new Post("Billing Systems Are Business Logic Heavy", "billing-systems-are-business-logic-heavy", "Billing systems require more than database queries. They require understanding contracts, customers, invoice items, rates, and operational meaning. Good software in billing must reflect the real business process accurately.", "Notes on building and supporting billing systems.", n4Category));

        savePost(new Post("Reports Tell Operational Stories", "reports-tell-operational-stories", "A report is not just a table of data. It tells a story about operations, performance, exceptions, and decisions. Good report design starts with understanding what the business user is trying to see.", "How reporting connects technical data to business insight.", n4Category));

        savePost(new Post("Why Production Systems Demand Discipline", "why-production-systems-demand-discipline", "Production systems require careful changes, testing, rollback awareness, and communication. Every deployment should respect the users depending on the system. Discipline matters more than speed when real operations are involved.", "A practical reminder about production discipline.", n4Category));

        savePost(new Post("From Legacy Systems to Modern APIs", "from-legacy-systems-to-modern-apis", "Modernizing legacy systems is not only about rewriting code. It is about preserving business knowledge while improving architecture, maintainability, and user experience. The best modernization work respects both the old system and the future one.", "Lessons from moving legacy workflows toward modern APIs.", n4Category));
    }

    private void savePost(Post post) {
        post.publish();
        postRepository.save(post);
    }
}