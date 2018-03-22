'''
Created by Dana Tearosh.
November, 2017.

Logger class to create logger object with logging module.

Example usage:
import loggerClass as logClass
output_file = 'test.log'
logger_obj = logClass.Logger(output_file)
logger = logger_obj.create_logger()

logger.info('.....some message....')
logger.warn('........warning......')
logger.error('........error.......')

Example usage:
import loggerClass as logClass
output_file = 'test.log'
logger_obj = logClass.Logger(log_name=output_file, level='WARNING', print_to_screen=False, print_time=True)
logger = logger_obj.create_logger()

logger.info("Hi!")                  --> nothing will be logged.
logger.warning("Hello world!")      --> At the log only:    2017-12-07 10:41:05,637 - Hello world!
'''


import logging
import time
from os import path, remove


class Logger:
    def __init__(self, log_name, level='DEBUG', print_to_file=True, print_to_screen=True, print_time=False, print_level=False):
        self.current_time = time.strftime("%d.%m.%y  %H:%M:%S")
        self.log_name = log_name
        self.log_level = level.upper()
        self.print_line_time = print_time
        self.print_line_level = print_level
        self.print_to_file = print_to_file
        self.print_to_screen = print_to_screen
        self.logger = None
        self.remove_exist_file()

    def create_logger(self):
        '''
        Create logger handler, according to object properties.
        :return: logger handler.
        '''
        self.logger = logging.getLogger()
        self.set_log_level()
        formatter = self.set_log_format()
        if self.print_to_file:
            self.create_and_add_file_handler(formatter)
        if self.print_to_screen:
            self.create_and_add_stream_handler(formatter)
        self.logger.info('{0} creadted. Time: {1}\n'.format(self.log_name, self.current_time))
        return self.logger

    def remove_exist_file(self):
        '''
        If the log name exist, remove it before running.
        :return: void function
        '''
        if path.exists(self.log_name):
            remove(self.log_name)
        return

    def create_and_add_file_handler(self,formatter):
        '''
        Create File hadnler, and add it to logger.
        :param formatter: The format of the log, created bt self.set_log_format().
        :return: void function
        '''
        file_handler = logging.FileHandler(self.log_name)
        file_handler.setLevel(logging.DEBUG)
        file_handler.setFormatter(formatter)
        self.logger.addHandler(file_handler)

    def create_and_add_stream_handler(self, formatter):
        '''
        Create stdin hadnler, and add it to logger.
        :param formatter: The format of the log, created bt self.set_log_format().
        :return: void function
        '''
        console_handler = logging.StreamHandler()
        console_handler.setLevel(logging.DEBUG)
        console_handler.setFormatter(formatter)
        self.logger.addHandler(console_handler)

    def set_log_format(self):
        '''
        Create the format of the logging. Set if each line will be printed with time/level
        :return: logging formatter
        '''
        format = ''
        if self.print_line_time:
            format += '%(asctime)s - '
        if self.print_line_level:
            format += '%(levelname)s - '
        format += '%(message)s'
        formatter = logging.Formatter(format)
        return formatter

    def set_log_level(self):
        '''
        possible levels: CRITICAL, ERROR, WARNING, INFO, DEBUG, NOTSET.
        Logging messages which are less severe than self.log_level will be ignored.
        :return: void function
        '''
        if self.log_level == 'DEBUG':
            self.logger.setLevel(logging.DEBUG)
        elif self.log_level == 'INFO':
            self.logger.setLevel(logging.INFO)
        elif self.log_level == 'WARNING':
            self.logger.setLevel(logging.WARNING)
        elif self.log_level == 'ERROR':
            self.logger.setLevel(logging.ERROR)
        elif self.log_level == 'CRITICAL':
            self.logger.setLevel(logging.CRITICAL)