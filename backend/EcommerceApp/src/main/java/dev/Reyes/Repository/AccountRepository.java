package dev.Reyes.Repository;

import dev.Reyes.Entity.Account;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

@Repository
public interface AccountRepository extends CrudRepository<Account, Integer>{
    @Query("FROM Account p WHERE p.email = :email")
    Account findByEmail(@Param("email") String email);
}
