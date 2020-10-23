#include <iostream>
#include <vector>
#include <set>

using namespace std;

void generate(int s,int n);
set<vector<int>> genrate_next_set(int s,const vector<set<vector<int>>>& problem);
vector<int> rotate_state(const vector<int>& v,int s,int rotate_size,int h,int w,int dir);

void generate(int s,int n){
	vector<set<vector<int>>> all_problem;

	vector<int> initial_state(s*s);
	for(int i = 0;i < s*s;i++)initial_state[i] = i+1;

	set<vector<int>> initial_set{initial_state};
	all_problem.push_back(initial_set);

	for(int i = 0;i < n;i++){
		set<vector<int>> next_set = genrate_next_set(s, all_problem);
		all_problem.push_back(next_set);
		cerr << "move : " << i+1 << " , size = " << next_set.size() << endl;
	}
}

set<vector<int>> genrate_next_set(int s,const vector<set<vector<int>>>& problem){
	set<vector<int>> next_set;
	int moves = problem.size();
	for(const auto& v:problem[moves-1]){
		for(int rotate_size = 2;rotate_size <= 3;rotate_size++){
			for(int dir = 0;dir < 2;dir++){
				for(int h = 0;h+rotate_size <= s;h++){
					for(int w = 0;w+rotate_size <= s;w++){
						// cerr << rotate_size << ", " << h  << ", " << w << ", " << dir << endl; 
						vector<int> next_state = rotate_state(v,s,rotate_size,h,w,dir);
						int f = 1;
						for(auto& p_set:problem){
							if(p_set.find(next_state) != p_set.end()){
								f = 0;
								break;
							}
						}
						if(f)next_set.insert(next_state);
					}
				}
			}
		}
	}
	return next_set;
}

vector<int> rotate_state(const vector<int>& v,int s,int rotate_size,int h,int w,int dir){
	vector<int> next_state = v;
	for(int i = 0;i < rotate_size;i++){
		for(int j = 0;j < rotate_size;j++){
			if(dir == 0) next_state[(h+i)*s + (w+j)] = v[(h+j)*s + (w+rotate_size-1-i)];
			else         next_state[(h+i)*s + (w+j)] = v[(h+rotate_size-1-j)*s + (w+i)];
		}
	}
	return next_state;
}


int main(){
	int s,n;
	cin >> s >> n;
	generate(s,n);
	return 0;
}