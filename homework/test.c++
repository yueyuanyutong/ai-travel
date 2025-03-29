#include <iostream>
#include <string>
#include <iomanip>
using namespace std;

struct LNode {
    string data;
    LNode* next;
    LNode* prev;
};

class LNlist {
private:
    LNode* head;
    LNode* tail;
    int length;
public:
    bool isEmpty() {
        return length == 0;
    }
    void initList() {
        head = new LNode;
        tail = new LNode;
        head->next = tail;
        tail->prev = head;
        head->prev = nullptr;
        tail->next = nullptr;
        length = 0;
    }

    //头插法插入数据
    void addNode(LNode* a) {
		LNode* newNode = new LNode;
		newNode->data = a->data;
		head->next->prev = newNode;
		newNode->next = head->next;
		newNode->prev = head;
		head->next = newNode;
		length++;
    }

    LNode* getLastNode() {
        if (!isEmpty()) {
            return tail->prev;
        }
        else {
            return nullptr;
        }
    }
    LNode* getFirstNode() {
        if (!isEmpty()) {
            return head->next;
        }
        else {
            return nullptr;
        }
    }
    LNode* getHead() { return head; }
    LNode* getTail() { return tail; }
    int getLength() { return length; }
};


//解析输入字符串->两个正数+实际运算符
void exString(const string& Str, string& numStr1, string& numStr2,bool& op) {
	int len = Str.length();
	int op_pos = Str.find_first_of("+-");
	numStr1 = Str.substr(0, op_pos);
	numStr2 = Str.substr(op_pos + 1);
	if (Str[op_pos] == '+') {
		op = true;
	}
	else {
		op = false;
	}
    if (Str[op_pos + 1] == '-') {
        op = !op;
        numStr2 = Str.substr(op_pos + 2);
    }
}


int change(string str) {
    int anser = 0;
    for (int x = 0; x < str.length(); x++) {
        anser = anser * 10 + (str[x] - '0');
    }
    return anser;
}



//解析数字字符串->链表
void exNumString(const string& numStr, LNlist& list) {
    int len = numStr.length();
    int start = len - 1;
    while (start >= 0) {
        int end = max(start - 3, 0);
        string blockStr = numStr.substr(end, start - end + 1);
        int block = stoi(blockStr);
        LNode node;
        node.data = to_string(block);
        list.addNode(node);
        start = end - 1;
    }
}

//链表相加：将节点转化为整形运算再转化为str存储
LNlist addLN(LNlist a, LNlist b, char op) {
    LNlist c;
    c.initList();
    LNode* pa = a.getLastNode();
    LNode* pb = b.getLastNode();
    int carry = 0;

    while (pa != a.getHead() || pb != b.getHead() || carry != 0) {
		int a_val = nullptr;
		int b_val = nullptr;
        if(pa!=NULL){
            a_val = change(pa->data);
        }
		else {
			a_val = 0;
		}
		if (pb!=NULL) {
			b_val = change(pb->data);
		}
        else
		{
			b_val = 0;
		}

        int result;
        if (op == '+') {
            result = a_val + b_val + carry;
            carry = result / 10000;
            result %= 10000;
        }
        else if (op == '-') {
            result = a_val - b_val - carry;
            carry = 0;
            if (result < 0) {
                result += 10000;
                carry = 1;
            }
        }
        else {
            cout << "无效的操作符" << endl;
            return c;
        }

        LNode node;
		if (result == 0) {
			node.data = "0000";
		}
		else {
			node.data = to_string(result);
		}
        c.addNode(node);

        if (pa != a.getHead()) pa = pa->prev;
        if (pb != b.getHead()) pb = pb->prev;
    }
    return c;
}

int main() {
    string input;
    cin >> input;
    bool OP ;
    string num1_str;
    string num2_str ;
	exString(input, num1_str, num2_str, OP);
	char op = OP ? '+' : '-';

    LNlist AL, BL;
    AL.initList();
    BL.initList();
    exNumString(num1_str, AL);
    exNumString(num2_str, BL);
    LNlist CL = addLN(AL, BL, op);

    // 输出结果
    LNode* current = CL.getFirstNode();
    if (current == nullptr) {
        cout << "0";
        return 0;
    }
    int start = 0;
	int Llength = CL.getLength();
    for (int i = 0; i < Llength; i++) {
        int j = 0;
        for (j = 0; j < 4; j++) {
            if (current->data[j] == '0') {
                continue;
			}
			else {
				start = j;
				break;
            }
        
        }
        if (j != 3) {
            break;
        }
        else
        {
			current = current->next;
			Llength--;
        }
    }
    for (int i = 0; i < Llength; i++) {
        cout << setw(4) << setfill('0') << current->data;
        current = current->next;
    }

    return 0;
}