import numpy
import random
import os



def calc_amount_of_groups(ids_list, group_size):
    # todo: add group_size_limit
    half_group_size = group_size/float(2)
    amount_of_groups = len(ids_list) / group_size  # will get an integer
    amount_of_students_per_group = [group_size] * amount_of_groups
    if len(ids_list) % group_size > half_group_size:
        amount_of_students_per_group.append(len(ids_list) % group_size)
        amount_of_groups += 1
    else:
        for i in range(len(ids_list) % group_size):
            amount_of_students_per_group[i/group_size] += 1
    return amount_of_groups, amount_of_students_per_group


def create_empty_groups_list(amount_of_groups):
    # for example: [[],[],[],[],[]]
    groups_list = [[] for i in range(amount_of_groups)]
    return groups_list


def add_first_layer(remaining_ids_list, ids_list, groups_list, total_score_matrix):
    # first split the kids with the most low score to avoid this allocation
    total_score_matrix[total_score_matrix == 0] = numpy.inf
    min_scores = total_score_matrix.min(axis=0)
    min_scores_indexes = numpy.argsort(min_scores)
    for i in range(len(groups_list)):
        id_to_allocate = ids_list[min_scores_indexes[i]]
        groups_list[i].append(id_to_allocate)
        remaining_ids_list.remove(id_to_allocate)
    return


def allocate_student_to_groups(data, ids_list, groups_list, total_score_matrix):
    remaining_ids_list = [student_id for student_id in ids_list]
    while len(remaining_ids_list) != 0:
        print("current group list:\n{0}".format(groups_list))
        print("remaining students:\n{0}\n".format(remaining_ids_list))
        if len(remaining_ids_list) == len(ids_list):
            add_first_layer(remaining_ids_list, ids_list, groups_list, total_score_matrix)
        else:
            add_students_layer(remaining_ids_list, ids_list, groups_list, total_score_matrix)
        print("#" * 75)
    print("current group list:\n{0}\n".format(groups_list))
    print("remaining students:\n{0}\n".format(remaining_ids_list))


def add_students_layer(remaining_students, ids_list, groups_list, total_score_matrix):
    for group in groups_list:
        score_list = calc_match_of_remaining_student_per_group(total_score_matrix, ids_list, remaining_students, group)
#         the best score will be append to the group
        index_of_best_match = numpy.array(score_list).argmax()
        group.append(remaining_students[index_of_best_match])
        remaining_students.pop(index_of_best_match)
        if len(remaining_students) == 0:
            # todo: add function for the last student layer --> which group should be bigger?
            return
    return


def calc_student_match_per_group(total_score_matrix, ids_list, student_id, students_group):
    mask = numpy.zeros(total_score_matrix.shape, dtype=bool)
    student_id_index = ids_list.index(student_id)
    for student in students_group:
        temp_index = ids_list.index(student)
        mask[student_id_index][temp_index] = numpy.True_

    total_score = total_score_matrix[mask].sum()
    return total_score


def calc_match_of_remaining_student_per_group(total_score_matrix, ids_list, remaining_students, students_group):
    scores_list =[]
    for student in remaining_students:
        scores_list.append(calc_student_match_per_group(total_score_matrix, ids_list, student, students_group))
    return scores_list


def calc_counters_score_matrix(counters_matrix):
    # score = 1 / ( 1 + count)
    print("score = 1 / (1 + count)")
    score_matrix = 1/(1+counters_matrix)
    print("Score according counters:\n{0}\n".format(score_matrix))
    return score_matrix


def calc_gender_score_matrix(gender_matrix):
    return gender_matrix


def calc_level_score_matrix(level_matrix):
    return level_matrix

def calc_random_score_matrix(random_matrix):
    return random_matrix

def calc_total_score_according_weights(scores_dict, weights_dict):
    models = weights_dict.keys()
    total_score_matrix = scores_dict[models[0]] * weights_dict[models[0]]
    for model in models[1:]:
        total_score_matrix += scores_dict[model] * weights_dict[model]
    print("Total score:\n{0}\n".format(total_score_matrix))
    return total_score_matrix


def create_counters_matrix(data, ids):
    matrix = []
    for i in range(len(ids)):
        vector = [0]*len(ids)
        vector[i] = numpy.inf
        for other_student in data["students"][0][ids[i]]:
            index = ids.index(other_student["id"])
            vector[index] = other_student["count"]
        matrix.append(vector)
    print("Counters matrix:\n{0}\n".format(numpy.array(matrix)))
    return numpy.array(matrix)

def create_gender_matrix(data, ids_list):
    score_matrix = numpy.zeros((len(ids_list),len(ids_list)))
    print("Gender matrix:\n{0}\n".format(score_matrix))
    return score_matrix

def create_level_matrix(data, ids_list):
    score_matrix = numpy.zeros((len(ids_list),len(ids_list)))
    print("Level matrix:\n{0}\n".format(score_matrix))
    return score_matrix

def create_random_matrix(data, ids_list):
    random_scores = numpy.random.rand(len(ids_list), len(ids_list))
    mask = 1 - numpy.diag([1]*len(ids_list))
    print("Random score:\n{0}\n".format(random_scores))
    return random_scores*mask

def get_ids_list(data):
    ids_list = data["students"][0].keys()
    for member in ids_list:
        if "id" not in member:
            ids_list.remove(member)
    print("ids list:\n{0}".format(ids_list))
    ids_list = [curr_id.encode('ascii', 'ignore') for curr_id in ids_list]
    return ids_list


def get_group_data(data):
    print("Size of each group: {0}\n".format(data["group"]["size"]))
    return data["group"]["size"]

def get_weights_dict(data):
    return data["group"]["weights"]

def get_scores_dictionary(data, weights_dict, ids_list):
    scores_dict = dict()
    for model in weights_dict.keys():
        func_name = "create_{0}_matrix".format(model)
        data_matrix = globals()[func_name](data, ids_list)
        func_name = "calc_{0}_score_matrix".format(model)
        scores_dict[model] = globals()[func_name](data_matrix)
    return scores_dict


def run_grouper(data):

    ids_list = get_ids_list(data)
    group_size = get_group_data(data)
    weights_dict = get_weights_dict(data)

    scores_dict = get_scores_dictionary(data, weights_dict, ids_list)

    total_score_matrix = calc_total_score_according_weights(scores_dict, weights_dict)

    amount_of_groups, amount_of_students_per_group = calc_amount_of_groups(ids_list, group_size)
    groups_list = create_empty_groups_list(amount_of_groups)
    allocate_student_to_groups(data, ids_list, groups_list, total_score_matrix)

    return groups_list