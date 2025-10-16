import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
} from 'react-native';

interface UserOption {
  id: number;
  label: string;
  value: string;
}

interface UserSelectorProps {
  users: UserOption[];
  selectedUser: string;
  onUserChange: (userName: string) => void;
  disabled?: boolean;
}

const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  selectedUser,
  onUserChange,
  disabled = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelectUser = (userName: string) => {
    onUserChange(userName);
    setIsModalVisible(false);
  };

  const selectedUserLabel =
    users.find(user => user.value === selectedUser)?.label || 'Select User';

  const renderUserItem = ({item}: {item: UserOption}) => {
    const isSelected = item.value === selectedUser;

    return (
      <TouchableOpacity
        style={[styles.userItem, isSelected && styles.selectedUserItem]}
        onPress={() => handleSelectUser(item.value)}>
        <Text
          style={[
            styles.userItemText,
            isSelected && styles.selectedUserItemText,
          ]}>
          {item.label}
        </Text>
        {isSelected && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select User:</Text>
      <TouchableOpacity
        style={[styles.selector, disabled && styles.selectorDisabled]}
        onPress={() => !disabled && setIsModalVisible(true)}
        disabled={disabled}>
        <Text
          style={[
            styles.selectorText,
            disabled && styles.selectorTextDisabled,
          ]}>
          {selectedUserLabel}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select User</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={users}
              renderItem={renderUserItem}
              keyExtractor={item => item.id.toString()}
              style={styles.userList}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
    fontWeight: '500',
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectorDisabled: {
    backgroundColor: '#F9F9F9',
    opacity: 0.6,
  },
  selectorText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  selectorTextDisabled: {
    color: '#999',
  },
  arrow: {
    fontSize: 10,
    color: '#666',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '80%',
    maxHeight: '70%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
    fontWeight: '300',
  },
  userList: {
    maxHeight: 400,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  selectedUserItem: {
    backgroundColor: '#E3F2FD',
  },
  userItemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedUserItemText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default UserSelector;
