// src/main/java/meex/repository/InvoiceRepository.java
package meex.repository;

import meex.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
}
