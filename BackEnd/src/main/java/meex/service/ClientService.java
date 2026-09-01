package meex.service;

import meex.model.Client;
import meex.dto.ClientDTO;
import java.util.List;

public interface ClientService {
    List<Client> getAllClients();
    Client getClientById(Long id);
    Client createClient(Client client);
    Client createClientFromDTO(ClientDTO clientDTO);
    Client updateClient(Long id, Client client);
    Client updateClientFromDTO(Long id, ClientDTO clientDTO);
    void deleteClient(Long id);
}
